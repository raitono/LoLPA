const util = require('util');

const debug = require('debug')('lolpa-gearman:Summoner');
const request = require('request-promise-native');

const Kayn	= require('../kayn');
const webServer = require('../util/web-server');

/**
 *	Update a Summoner's information or insert a new Summoner if they don't already exist
 *	@param {string} summonerName - Summoner name to update
 *	@return {Promise} - Returns the Riot API Summoner object in JSON
 */
let update = function(summonerName) {
	return new Promise(function(resolve, reject) {
		Kayn.Summoner.by.name(summonerName).then(function(rawSummoner) {
			let options = {
				method: 'POST',
				uri: webServer.URLs.Summoner.upsertWithWhere('{"name": "'+summonerName+'"}'),
				body: {
					id: rawSummoner.id,
					accountId: rawSummoner.accountId,
					profileIconId: rawSummoner.profileIconId,
					summonerLevel: rawSummoner.summonerLevel,
					name: rawSummoner.name,
					revisionDate: rawSummoner.revisionDate,
				},
				json: true,
			};

			request(options).then(function(dbResult) {
				resolve(JSON.stringify(dbResult));
			}).catch(function(reason) {
				reject(reason);
			});
		}).catch(function(reason) {
			reject(reason);
		});
	});
};

/**
 * Update a Summoner's match list and pull the new data
 * @param {Object} summoner - Summoner whose matches we are updating
 * @param {Object} options - OPTIONAL MatchList filetering options
 * @return {Promise}
 */
let updateMatchList = function(summoner, options) {
	return new Promise(function(resolve, reject) {
		let dbSummoner = JSON.parse(summoner);

		getMatchDates(dbSummoner.lastUpdated, dbSummoner.revisionDate).then(function(dates) {
			let matchOptions = {};
			if (util.isNullOrUndefined(options)) {
				matchOptions = {
					beginTime: dates.beginTime,
					endTime: dates.endTime,
				};
			}
			// TODO: Test to make sure these dates are correct
			Kayn.Matchlist.by.accountID(dbSummoner.accountId)
				.query(matchOptions).then(function(result) {
					debug(result);
					resolve();
				}).catch(function(reason) {
					debug(reason);
				});
		});
	});
};

/**
 * @param {long} summonerLastUpdated UNIX milliseconds representing the last time the Summoner was updated
 * @param {long} summonerLastRevision UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @return {Object} JSON object containing beginTime and endTime to be used with a match method
 */
let getMatchDates = function(summonerLastUpdated, summonerLastRevision) {
	return new Promise(function(resolve, reject) {
		if (util.isNullOrUndefined(summonerLastUpdated)) {
			request(webServer.URLs.Season.get('{"endDate": null}')).then(function(dbSeason) {
				dbSeason = JSON.parse(dbSeason)[0];
				let beginTime = new Date(dbSeason.startDate).getTime();
				resolve({
					beginTime: beginTime,
					endTime: beginTime + 604800000,
				});
			}).catch(function(reason) {
				debug(reason);
				reject(reason);
			});
		} else if (summonerLastRevision > summonerLastUpdated) {
			resolve({
				beginTime: new Date(summonerLastUpdated).getTime(),
				endTime: new Date(summonerLastRevision).getTime(),
			});
		} else {
			resolve({
				beginTime: new Date(summonerLastUpdated).getTime(),
				endTime: new Date(summonerLastUpdated).getTime(),
			});
		}
	});
};

module.exports.registerWorkers = function(worker) {
	worker.registerWorker('toUpper', function(task) {
		debug('toUpper ' + task.payload);
		return task.payload.toUpperCase();
	});
	worker.registerWorker('updateSummoner', function(task) {
		debug('update summoner: ' + task.payload);
		update(task.payload).then(function(s) {
			task.end(s);
		}).catch(function(reason) {
			debug(reason);
		});
	});
	worker.registerWorker('updateMatchList', function(task) {
		debug('update Match List:', JSON.parse(task.payload).name);
		updateMatchList(task.payload).then(function(r) {
			task.end(r);
		}).catch(function(reason) {
			debug(reason);
		});
	});

	debug('Workers registered');
};
