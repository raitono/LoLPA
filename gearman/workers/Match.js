const util = require('util');

const debug = require('debug')('lolpa-gearman:Match');
const request = require('request-promise-native');

const Kayn	= require('../kayn');
const webServer = require('../util/web-server');

/**
 * Pull new matches and add them to the database
 * @param {Object} summoner Summoner whose matches we are updating
 * @param {Object} options JSON options containing beginTime and endTime in UNIX milliseconds
 * @return {Promise}
 */
let updateMatchList = (summoner) => {
	try {
		summoner = JSON.parse(summoner);
	} catch (e) {
		debug(e);
	}

	return getMatchList(summoner)
		.then(() => {
			// We have all the matches. Extract the gameIds.
			let matchBatch = [];
			summoner.matchList.forEach((matchList) => {
				matchBatch.push(matchList.gameId);
			});

			// Send get the matches from RIOT
			return Promise.all(matchBatch.map(Kayn.Match.get));
		})
		.then((matches) => {
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
			return Promise.all([matches, matchInsertBatch.map(request)]);
		}).then((matchInsertResult) => {
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

			return Promise.all(matchListBatch.map(request));
		}).catch((reason) => {
			debug('General problem');
			debug(reason);
		});
};

let getMatchList = (summoner, options) => {
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
	return getMatchDates(options.beginTime || summoner.lastUpdated,
		options.endTime || summoner.revisionDate)
		.then((matchOptions) => {
			// Send request to RIOT API
			options = matchOptions;
			// debug(options);
			return Kayn.Matchlist.by.accountID(summoner.accountId).query(options);
		}).then((riotMatchList) => {
			// Package the options we sent and the list returned
			return ({
				options,
				riotMatchList,
			});
		}).catch((reason) => {
			if (reason.statusCode == 404) {
				// This just means they don't have any matches during the time period
				// so return the options and a null list
				return ({
					options,
					riotMatchList: null,
				});
			} else {
				debug('Problem calling Kayn');
				debug(reason);
			}
		}).then((result) => {
			// Determine if we can stop the recursive loop
			if (result.options.beginTime < new Date(summoner.revisionDate).getTime()) {
				// We are not done yet
				if (util.isNullOrUndefined(summoner.matchList)) {
					summoner.matchList = [];
				}

				if (!util.isNullOrUndefined(result.riotMatchList)) {
					Array.prototype.push.apply(summoner.matchList, result.riotMatchList.matches);
				}

				// Call the recursive function, but with update options and the match list attached to the summoner
				return getMatchList(summoner, {
					beginTime: result.options.endTime,
					endTime: result.options.endTime + 604800000, // Add a week, the max allowed time by RIOT API
				});
			} else {
				// We're done. Finish the loop.
				return;
			}
		});
};

/**
 * @param {long} beginTime UNIX milliseconds representing the last time the Summoner was updated
 * @param {long} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @param {Object} options OPTIONAL - JSON Object containing beginTime and endTime. If this is present, simply returns it back.
 * @return {Object} JSON object containing beginTime and endTime to be used with a match method
 */
let getMatchDates = (beginTime, endTime) => {
	return new Promise((resolve, reject) => {
		if (util.isNullOrUndefined(beginTime)) {
			return request(webServer.URLs.Season.get('{"endDate": null}'))
				.then((dbSeason) => {
					dbSeason = JSON.parse(dbSeason)[0];
					let seasonStart = new Date(dbSeason.startDate).getTime();
					resolve({
						beginTime: seasonStart,
						endTime: seasonStart + 604800000,
					});
				}).catch((reason) => {
					debug('Problem getting current season');
					debug(reason);
					reject(reason);
				});
		} else {
			resolve({
				beginTime: new Date(beginTime).getTime(),
				endTime: new Date(endTime).getTime(),
			});
		}
	});
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateMatchList', (task) => {
		debug('update Match List:', JSON.parse(task.payload).name);
		updateMatchList(task.payload)
			.then((r) => {
				debug('End task');
				task.end(r);
			}).catch((reason) => {
				debug('Problem running updateMatchList');
				debug(reason);
			});
	});

	debug('Workers registered');
};
