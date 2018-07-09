const util = require('util');

const debug = require('debug')('lolpa-gearman:Match');
const request = require('request-promise-native');

const Kayn	= require('../kayn');
const webServer = require('../util/web-server');

/**
 * Pull new matches and add them to the database
 * @param {Object} summoner Summoner whose matches we are updating
 * @return {Promise}
 */
let updateMatchList = function(summoner) {
	return new Promise(function(resolve, reject) {
		getMatchList(summoner);
	});
};

/**
 * Attach a match list to the summoner containing matches from last updated date to last revision date.
 * If last update date is null, start at the current season's start date.
 * @param {Object} summoner Summoner whose matches we are updating
 * @param {Object} options OPTIONAL - MatchList filtering options
 * @return {Promise}
 */
let getMatchList = function(summoner, options) {
	return new Promise(function(resolve, reject) {
		let dbSummoner = {};
		let matchOptions = {};

		try {
			dbSummoner = JSON.parse(summoner);
		} catch (e) {
			dbSummoner = summoner;
		} finally {
			if (util.isNullOrUndefined(options)) {
				options = {
					beginTime: null,
					endTime: null,
				};
			}
			debug(options);
			getMatchDates(options.beginTime || dbSummoner.lastUpdated,
				options.endTime || dbSummoner.revisionDate).then(function(dates) {
				matchOptions = {
					beginTime: dates.beginTime,
					endTime: dates.endTime,
				};

				Kayn.Matchlist.by.accountID(dbSummoner.accountId)
					.query(matchOptions).then(function(result) {
						if (util.isNullOrUndefined(dbSummoner.matchList)) {
							dbSummoner.matchList = [];
						}

						Array.prototype.push.apply(dbSummoner.matchList, result.matches);

						getNextMatchList(dbSummoner, dates.endTime);
					}).catch(function(reason) {
						if (reason.statusCode == 404) {
							// This just means they don't have any matches during the time period
							getNextMatchList(dbSummoner, dates.endTime);
						} else {
							debug(reason);
							reject();
						}
					});
			});
		}
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
			request(webServer.URLs.Season.get('{"endDate": null}')).then(function(dbSeason) {
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

/**
 * Used to continue the MatchList loop. Needed because of the possibility of getting a 404 when the
 * summoner has no matches for a particular date range. This allows me to call it in the catch.
 * @param {Object} summoner JSON Summoner object
 * @param {long} beginTime UNIX milliseconds for when the next date range is to begin. Compared to the Summoner's revisionDate to determine if we can stop
 * @return {Promise}
 */
let getNextMatchList = function(summoner, beginTime) {
	return new Promise(function(resolve, reject) {
		if (beginTime <= new Date(summoner.revisionDate).getTime()) {
			getMatchList(summoner, {
				beginTime: beginTime,
				endTime: beginTime + 604800000,
			}).catch(function(reason) {
				debug(reason);
			});
		} else {
			debug(summoner.matchList);
			resolve();
		}
	});
};

module.exports.registerWorkers = function(worker) {
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
