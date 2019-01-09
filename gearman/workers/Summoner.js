const debug = require('debug')('lolpa-gearman:Summoner');
const request = require('request-promise-native');
const Kayn	= require('../kayn');

const webServer = require('../util/web-server');

/**
 *	Determine which updates to perform on a Summoner. Currently only detect matches.
 *	@param {string} summoner JSON representation of the Summoner to update
 *	@return {Object} Object.summoner - JSON string representation of the summoner
 * 					 Object.shouldUpdateMatches - Boolean
 */
const determineUpdates = async (summoner) => {
	let ret = {
		summoner: JSON.parse(summoner),
		shouldUpdateMatches: false,
	};

	if (ret.summoner.lastUpdated == undefined) {
		ret.shouldUpdateMatches = true;
		return JSON.stringify(ret);
	} else if (Date.now() - Date.parse(ret.summoner.lastUpdated) >= 600000) {
		const rawSummoner = await Kayn.SummonerV4.by.name(ret.summoner.name);
		if ((rawSummoner.revisionDate - Date.parse(ret.summoner.revisionDate)) != 0) {
			await request({
				method: 'PUT',
				uri: webServer.URLs.Summoner.put(rawSummoner.puuid),
				body: {
					puuid: rawSummoner.puuid,
					summonerId: rawSummoner.id,
					accountId: rawSummoner.accountId,
					profileIconId: rawSummoner.profileIconId,
					summonerLevel: rawSummoner.summonerLevel,
					name: rawSummoner.name,
					revisionDate: new Date(rawSummoner.revisionDate),
					lastUpdated: new Date(ret.summoner.lastUpdated),
				},
				json: true,
			});

			ret = {
				summoner: await request({
					method: 'GET',
					uri: webServer.URLs.Summoner.get(rawSummoner.puuid),
					json: true,
				}),
				shouldUpdateMatches: true,
			};
		}
	}

	return JSON.stringify(ret);
};

/**
 * Retrieve a summoner from the database.
 * If the summoner cannot be found, retrieves it from RIOT and inserts it.
 * @param {string} summonerName Summoner name to update
 * @return {string} JSON string representing the summoner stored in the database
 */
const getSummonerByName = async (summonerName) => {
	let summoner = '';
	const summonerDBRequestOptions = {
		method: 'GET',
		uri: webServer.URLs.Summoner.getByName(summonerName),
		json: true,
	};

	summoner = await request(summonerDBRequestOptions);
	summoner = summoner[0];

	if (summoner) {
		debug('Retrieved Summoner');
	} else {
		debug('Summoner not found in db');
		try {
			const rawSummoner = await Kayn.SummonerV4.by.name(summonerName);
			await request({
				method: 'POST',
				uri: webServer.URLs.Summoner.post(),
				body: {
					puuid: rawSummoner.puuid,
					summonerId: rawSummoner.id,
					accountId: rawSummoner.accountId,
					profileIconId: rawSummoner.profileIconId,
					summonerLevel: rawSummoner.summonerLevel,
					name: rawSummoner.name,
					revisionDate: new Date(rawSummoner.revisionDate),
				},
				json: true,
			});

			summoner = await request(summonerDBRequestOptions);
			summoner = summoner[0];
		} catch (kaynError) {
			if (kaynError.statusCode == 404) {
				debug('Summoner does not exist: ' + summonerName);
			}
			debug('Kayn Error:' + kaynError);
		}
	}

	return JSON.stringify(summoner);
};

/**
 * Updates the Summoner's lastUpdated field to now
 * @param {string} summoner Json representation of a Summoner
 */
const updateLastUpdated = async (summoner) => {
	summoner = JSON.parse(summoner);
	request({
		method: 'PUT',
		uri: webServer.URLs.Summoner.put(summoner.puuid),
		body: {
			puuid: summoner.puuid,
			summonerId: summoner.summonerId,
			accountId: summoner.accountId,
			profileIconId: summoner.profileIconId,
			summonerLevel: summoner.summonerLevel,
			name: summoner.name,
			revisionDate: new Date(summoner.revisionDate),
			lastUpdated: new Date(Date.now()),
		},
		json: true,
	});
};

module.exports.registerWorkers = (client) => {
	client.registerWorker('determineUpdates', async (task) => {
		const s = await determineUpdates(task.payload);
		task.end(s);
	});

	client.registerWorker('getSummonerByName', async (task) => {
		debug('getSummonerByName: ' + task.payload);
		const s = await getSummonerByName(task.payload);
		task.end(s);
	});

	client.registerWorker('updateSummonerLastUpdated', async (task) => {
		debug('update lastUpdated');
		const s = await updateLastUpdated(task.payload);
		task.end(s);
	});

	debug('Workers registered');
};
