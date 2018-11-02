require('dotenv-safe').config();

const debug = require('debug')('lolpa-gearman:app');
const express = require('express');
const app = express();

const Gearman = require('abraxas');
const Summoner = require('./workers/Summoner');
const Match = require('./workers/Match');
const StaticData = require('./workers/StaticData');

app.use(express.static('public'));

const port = process.env.PORT || 8080;

app.listen(port, () => {
	Gearman.Server.listen({
		port: 4730,
	});
	debug('Gearman listening on port 4730');

	let worker = Gearman.Client.connect({
		servers: ['127.0.0.1:4730'],
		defaultEncoding: 'utf8',
	});

	Summoner.registerWorkers(worker);
	Match.registerWorkers(worker);
	StaticData.registerWorkers(worker);

	worker.submitJob('updateStaticData', 'ThisIsNecessaryButNotUsed')
		.then(function() {
			debug('updateStaticData done');
		}).catch(function(reason) {
			debug(reason);
		});

	/* worker.submitJob('updateSummonerByName', 'Raitono').then(function(result) {
		let dbSummoner = JSON.parse(result);
		debug('Updated summoner: ' + dbSummoner.name);

		worker.submitJob('updateMatchList', result).then(function(mlResult) {
			debug('Updated match list for ' + dbSummoner.name);
		}).catch(function(reason) {
			debug(reason);
		});
	}).catch(function(reason) {
		debug(reason);
	}); */
});

module.exports = app;
