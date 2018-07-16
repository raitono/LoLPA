const debug = require('debug')('lolpa-gearman:Summoner');
const request = require('request-promise-native');
const Kayn	= require('../kayn');

const webServer = require('../util/web-server');

/**
 *	Update a Summoner's information or insert a new Summoner if they don't already exist
 *	@param {string} summonerName - Summoner name to update
 *	@return {Promise} - Returns the Riot API Summoner object in JSON
 */
let updateByName = async (summonerName) => {
	let rawSummoner = await Kayn.Summoner.by.name(summonerName);

	let options = {
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
	};

	return JSON.stringify(await request(options));
};


module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateSummonerByName', async (task) => {
		debug('update summoner: ' + task.payload);
		updateByName(task.payload).then(function(s) {
			task.end(s);
		}).catch(function(reason) {
			debug(reason);
		});
	});

	debug('Workers registered');
};
