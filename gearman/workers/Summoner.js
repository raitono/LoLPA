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
 *	@param {string} summonerName - Summoner name to update
 *	@return {Promise} - Returns the Riot API Summoner object in JSON
 */
let update = function(summonerName) {
	return new Promise(function(resolve, reject) {
		db.query('SELECT * FROM Summoner WHERE name = \''+summonerName+'\'').then(function(result) {
			if (result[0]) {
				debug('Summoner exists');
			} else {
				debug('Summoner does not exist');

				Kayn.Summoner.by.name(summonerName)
					.then(function(s) {
						resolve(JSON.stringify(s)); // Because the Promise returns the string [object Object] and not the actual object
					})
					.catch(function(reason) {
						reject(reason);
					});
			}
		})
			.catch(function(reason) {
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
		})
			.catch(function(reason) {
				debug(reason);
			});
	});

	debug('Workers registered');
};
