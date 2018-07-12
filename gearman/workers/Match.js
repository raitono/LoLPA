const util = require('util');

const debug = require('debug')('lolpa-gearman:Match');
const request = require('request-promise-native');

const Kayn	= require('../kayn');
const webServer = require('../util/web-server');

/**
 * Pull new matches and add them to the database
 * @param {Object} summoner Summoner whose matches we are updating
 * @param {Object} options JSON options containing beginTime and endTime in UNIX milliseconds
 */
let updateMatchList = async function(summoner) {
	try {
		summoner = JSON.parse(summoner);
	} catch (e) {
		debug(e);
	}

	await getMatchList(summoner);

	// We have all the matches. Extract the gameIds.
	let matchBatch = [];
	summoner.matchList.forEach((matchList) => {
		matchBatch.push(matchList.gameId);
	});

	// Send get the matches from RIOT
	let matches = await Promise.all(matchBatch.map(Kayn.Match.get));
	let matchInsertBatch = [];

	// Batch up the insert options
	matches.forEach((match) => {
		matchInsertBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Matches.put(),
			body: {
				gameId: match.gameId,
				seasonId: match.seasonId,
				queueId: match.queueId,
				mapId: match.mapId,
				platformId: match.platformId,
				gameVersion: match.gameVersion,
				gameMode: match.gameMode,
				gameType: match.gameType,
				gameDuration: match.gameDuration,
				gameCreation: match.gameCreation,
			},
			json: true,
		});
	});

	// Insert the Matches
	await Promise.all(matchInsertBatch.map(request));

	// Insert match lists
	let matchListBatch = [];
	summoner.matchList.forEach((m) => {
		matchListBatch.push({
			method: 'PUT',
			uri: webServer.URLs.MatchList.put(),
			body: {
				summonerId: summoner.id,
				gameId: m.gameId,
				championId: m.champion,
				lane: m.lane,
				role: m.role,
				timestamp: m.timestamp,
			},
			json: true,
		});
	});

	await Promise.all(matchListBatch.map(request));
};

let getMatchList = async (summoner, options) => {
	if (!util.isObject(summoner)) {
		try {
			summoner = JSON.parse(summoner);
		} catch (e) {
			debug(e);
		}
	}

	if (util.isNullOrUndefined(options)) {
		options = {
			beginTime: null,
			endTime: null,
		};
	}

	// Determine the dates to pull
	options = await getMatchDates(options.beginTime || summoner.lastUpdated,
		options.endTime || summoner.revisionDate);

	let riotMatchList = null;
	try {
		// Send request to RIOT API
		riotMatchList = await Kayn.Matchlist.by.accountID(summoner.accountId).query(options);
	} catch (err) {
		if (err.statusCode == 404) {
			// This just means they don't have any matches during the time period
			// so return the options and a null list
			riotMatchList = null;
		} else {
			debug('Problem calling Kayn');
			debug(err);
		}
	}

	// Determine if we can stop the recursive loop
	if (options.beginTime < new Date(summoner.revisionDate).getTime()) {
		// We are not done yet
		if (util.isNullOrUndefined(summoner.matchList)) {
			summoner.matchList = [];
		}

		if (!util.isNullOrUndefined(riotMatchList)) {
			Array.prototype.push.apply(summoner.matchList, riotMatchList.matches);
		}

		// Call the recursive function, but with update options and the match list attached to the summoner
		return getMatchList(summoner, {
			beginTime: options.endTime,
			endTime: options.endTime + 604800000, // Add a week, the max allowed time by RIOT API
		});
	} else {
		// We're done. Finish the loop.
		return;
	}
};

/**
 * @param {long} beginTime UNIX milliseconds representing the last time the Summoner was updated
 * @param {long} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @return {Object} JSON object containing beginTime and endTime to be used with a match method
 */
let getMatchDates = async (beginTime, endTime) => {
	if (util.isNullOrUndefined(beginTime)) {
		let dbSeason = await request(webServer.URLs.Season.get('{"endDate": null}'));
		dbSeason = JSON.parse(dbSeason)[0];
		let seasonStart = new Date(dbSeason.startDate).getTime();
		return {
			beginTime: seasonStart,
			endTime: seasonStart + 604800000,
		};
	} else {
		return {
			beginTime: new Date(beginTime).getTime(),
			endTime: new Date(endTime).getTime(),
		};
	}
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateMatchList', async (task) => {
		debug('Update Match List:', JSON.parse(task.payload).name);
		let result = await updateMatchList(task.payload);
		task.end(result);
	});

	debug('Workers registered');
};
