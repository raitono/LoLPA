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
let updateMatchList = function(summoner, options) {
	let dbSummoner = {};

	try {
		dbSummoner = JSON.parse(summoner);
	} catch (e) {
		dbSummoner = summoner;
	}

	if (util.isNullOrUndefined(options)) {
		options = {
			beginTime: null,
			endTime: null,
		};
	}

	return getMatchDates(options.beginTime || dbSummoner.lastUpdated,
		options.endTime || dbSummoner.revisionDate)
		.then(function(matchOptions) {
			options = matchOptions;
			debug(options);
			return Kayn.Matchlist.by.accountID(dbSummoner.accountId).query(options);
		}).then(function(riotMatchList) {
			return ({
				options,
				riotMatchList,
			});
		}).catch(function(reason) {
			if (reason.statusCode == 404) {
				// This just means they don't have any matches during the time period
				return ({
					options,
					riotMatchList: null,
				});
			} else {
				debug(reason);
			}
		}).then(function(result) {
			if (result.options.beginTime < new Date(dbSummoner.revisionDate).getTime()) {
				if (util.isNullOrUndefined(dbSummoner.matchList)) {
					dbSummoner.matchList = [];
				}

				if (!util.isNullOrUndefined(result.riotMatchList)) {
					Array.prototype.push.apply(dbSummoner.matchList, result.riotMatchList.matches);
				}

				return updateMatchList(dbSummoner, {
					beginTime: result.options.endTime,
					endTime: result.options.endTime + 604800000,
				});
			} else {
				debug('Success! Time to get the actual matches now.');
			}
		}).catch(function(reason) {
			debug(reason);
		});
};

/**
 * @param {long} beginTime UNIX milliseconds representing the last time the Summoner was updated
 * @param {long} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @param {Object} options OPTIONAL - JSON Object containing beginTime and endTime. If this is present, simply returns it back.
 * @return {Object} JSON object containing beginTime and endTime to be used with a match method
 */
let getMatchDates = function(beginTime, endTime) {
	return new Promise(function(resolve, reject) {
		if (util.isNullOrUndefined(beginTime)) {
			return request(webServer.URLs.Season.get('{"endDate": null}')).then(function(dbSeason) {
				dbSeason = JSON.parse(dbSeason)[0];
				let seasonStart = new Date(dbSeason.startDate).getTime();
				resolve({
					beginTime: seasonStart,
					endTime: seasonStart + 604800000,
				});
			}).catch(function(reason) {
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

module.exports.registerWorkers = function(worker) {
	worker.registerWorker('updateMatchList', function(task) {
		debug('update Match List:', JSON.parse(task.payload).name);
		updateMatchList(task.payload).then(function(r) {
			debug('End task');
			task.end(r);
		}).catch(function(reason) {
			debug(reason);
		});
	});

	debug('Workers registered');
};
