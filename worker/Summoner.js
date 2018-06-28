const debug = require('debug')('worker:Summoner');

/**
 *	Find Summoner in database
 * 		Create if not exists
 *	Check last update date
 *		If null then pull most recent first before queueing history
 *	Use last update date to pull data from Riot
 *	@param {object} task - Gearman task. task.payload contains the summoner name to update
 */
let update = function(task) {
	debug('update');
};

module.exports.registerWorkers = function(worker) {
	worker.registerWorker('toUpper', function(task) {
		debug('toUpper');
		return task.payload.toUpperCase();
	});
	worker.registerWorker('update', update);
};
