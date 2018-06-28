const debug = require('debug')('lolpa-gearman:Summoner');
const mysql = require('mysql').createConnection({
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
	debug('update');

	mysql.connect(function(err) {
		if (err) throw err;
		debug('MySQL Connected');

		debug('SELECT * FROM Summoners WHERE name = \''+task.payload+'\'');
		mysql.query('SELECT * FROM Summoners WHERE name = \''+task.payload+'\'',
			function(err, result) {
				if (err) throw err;
				debug(result);
				return result;
			});
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
