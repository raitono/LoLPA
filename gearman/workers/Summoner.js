const debug = require('debug')('lolpa-gearman:Summoner');
const request = require('request-promise-native');
const Kayn	= require('../kayn');

const webServer = require('../util/web-server');

/**
 *	Update a Summoner's information or insert a new Summoner if they don't already exist
 *	@param {string} summonerName - Summoner name to update
 *	@return {Boolean} - If the match list should be updated
 */
let updateByName = async (summonerName) => {
	let rawSummoner = await Kayn.Summoner.by.name(summonerName);

	let dbSummoner = JSON.parse(await getSummonerByName(summonerName));
	debug(dbSummoner);
	debug('raw revision: ' + rawSummoner.revisionDate);
	debug('db revision: ' + dbSummoner.revisionDate);

	/* if ((rawSummoner.revisionDate - dbSummoner.revisionDate) > 10) {
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
				lastUpdated: Date.now(),
			},
			json: true,
		});
		return true;
	} */

	return false;
};

/**
 * Retrieve a summoner from the database
 * @param {string} summonerName - Summoner name to update
 * @return {string} - JSON string representing the summoner stored in the database
 */
let getSummonerByName = async (summonerName) => {
	return JSON.stringify(await request({
		method: 'GET',
		uri: webServer.URLs.Summoner.getByName(summonerName),
		json: true,
	}));
};

module.exports.registerWorkers = (client) => {
	client.registerWorker('updateSummonerByName', async (task) => {
		debug('update summoner: ' + task.payload);
		let s = await updateByName(task.payload);
		task.end(s);
	});

	debug('Workers registered');
};
