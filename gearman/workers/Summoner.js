const debug = require('debug')('lolpa-gearman:Summoner');
const Mysql = require('../Database');
const Kayn	= require('../kayn');

let db = new Mysql({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT || 3306,
	database: 'riot',
});

/**
 *	Find Summoner in database
 * 		Create if not exists
 *	Check last update date
 *		If null then pull most recent first before queueing history
 *	Use last update date to pull data from Riot
 *	@param {object} task - Gearman task. task.payload contains the summoner name to update
 */
let update = function(task) {
	debug('update ' + task.payload);

	db.query('SELECT * FROM Summoner WHERE name = \''+task.payload+'\'').then(function(result) {
		if (result[0]) {
			debug('Summoner exists');
		} else {
			debug('Summoner does not exist');

			Kayn.Summoner.by.name(task.payload)
				.then(function(s) {
					return s;
				})
				.catch(function(reason) {
					debug(reason);
					return reason;
				});
		}
	});
};

module.exports.registerWorkers = function(worker) {
	worker.registerWorker('toUpper', function(task) {
		debug('toUpper');
		return task.payload.toUpperCase();
	});
	worker.registerWorker('update', update);

	debug('Workers registered');
};
