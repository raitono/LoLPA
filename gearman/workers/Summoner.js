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
let determineUpdates = async (summoner) => {
	let ret = {
		summoner: JSON.parse(summoner),
		shouldUpdateMatches: false,
	};

	if (ret.summoner.lastUpdated == undefined) {
		ret.shouldUpdateMatches = true;
		return JSON.stringify(ret);
	} else if (Date.now() - Date.parse(ret.summoner.lastUpdated) >= 600000) {
		let rawSummoner = await Kayn.Summoner.by.name(ret.summoner.name);
		if ((rawSummoner.revisionDate - Date.parse(ret.summoner.revisionDate)) != 0) {
			ret.shouldUpdateMatches = true;
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
let getSummonerByName = async (summonerName) => {
	let summoner = '';
	let summonerDBRequestOptions = {
		method: 'GET',
		uri: webServer.URLs.Summoner.getByName(summonerName),
		json: true,
	};

	try {
		summoner = await request(summonerDBRequestOptions);
	} catch (error) {
		if (error.error.error.statusCode == 404) {
			debug('Summoner not found in db');
			try {
				let rawSummoner = await Kayn.Summoner.by.name(summonerName);
				await request({
					method: 'POST',
					uri: webServer.URLs.Summoner.upsertWithWhere('{"name": "'+summonerName+'"}'),
					body: {
						summonerId: rawSummoner.id,
						accountId: rawSummoner.accountId,
						profileIconId: rawSummoner.profileIconId,
						summonerLevel: rawSummoner.summonerLevel,
						name: rawSummoner.name,
						revisionDate: rawSummoner.revisionDate,
					},
					json: true,
				});

				summoner = await request(summonerDBRequestOptions);
			} catch (kaynError) {
				if (kaynError.statusCode == 404) {
					debug('Summoner does not exist: ' + summonerName);
					throw kaynError;
				}
			}
		} else {
			debug(error);
		}
	}
	return JSON.stringify(summoner);
};

/**
 * Updates the Summoner's lastUpdated field to now
 * @param {string} summoner Json representation of a Summoner
 */
let updateLastUpdated = async (summoner) => {
	summoner = JSON.parse(summoner);
	request({
		method: 'POST',
		uri: webServer.URLs.Summoner.upsertWithWhere('{"name": "'+summoner.name+'"}'),
		body: {
			summonerId: summoner.summonerId,
			accountId: summoner.accountId,
			profileIconId: summoner.profileIconId,
			summonerLevel: summoner.summonerLevel,
			name: summoner.name,
			revisionDate: summoner.revisionDate,
			lastUpdated: Date.now(),
		},
		json: true,
	});
};

module.exports.registerWorkers = (client) => {
	client.registerWorker('determineUpdates', async (task) => {
		let s = await determineUpdates(task.payload);
		task.end(s);
	});

	client.registerWorker('getSummonerByName', async (task) => {
		let s = await getSummonerByName(task.payload);
		task.end(s);
	});

	client.registerWorker('updateSummonerLastUpdated', async (task) => {
		let s = await updateLastUpdated(task.payload);
		task.end(s);
	});

	debug('Workers registered');
};
