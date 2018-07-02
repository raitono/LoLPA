const debug = require('debug')('lolpa-gearman:Summoner');
const request = require('request-promise-native');

const Kayn	= require('../kayn');
const webServer = require('../util/web-server');

/**
 *	Find Summoner in database
 * 		Create if not exists
 *	Check last update date
 *		If null then pull most recent first before queueing history
 *	Use last update date to pull data from Riot
 *	@param {string} summonerName - Summoner name to update
 *	@return {Promise} - Returns the Riot API Summoner object in JSON
 */
let update = function(summonerName) {
	return new Promise(function(resolve, reject) {
		Kayn.Summoner.by.name(summonerName).then(function(rawSummoner) {
			let options = {
				method: 'POST',
				uri: webServer.URLs.upsertWithWhere('{"name": "'+summonerName+'"}'),
				body: {
					Summoner: rawSummoner,
				},
				json: true,
			};

			request(options).then(function(dbResult) {
				dbResult = JSON.parse(dbResult); // We just get a string back. Parse it so we can use it as an object

				debug(dbResult);
				resolve(dbResult);
			}).catch(function(reason) {
				reject(reason);
			});
		}).catch(function(reason) {
			reject(reason);
		});
	});
};

module.exports.registerWorkers = function(worker) {
	worker.registerWorker('toUpper', function(task) {
		debug('toUpper ' + task.payload);
		return task.payload.toUpperCase();
	});
	worker.registerWorker('update', function(task) {
		debug('update ' + task.payload);
		update(task.payload).then(function(s) {
			task.end(s);
		}).catch(function(reason) {
			debug(reason);
		});
	});

	debug('Workers registered');
};
