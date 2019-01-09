require('dotenv-safe').config();
require('./util/utilExtension');

const debug = require('debug')('lolpa-gearman:app');
const express = require('express');
const app = express();
const fs = require('fs');

const Gearman = require('abraxas');
const Summoner = require('./workers/Summoner');
const Match = require('./workers/Match');
const StaticData = require('./workers/StaticData');

const port = process.env.PORT || 8080;
const staticDataTempDir = './temp';
let client = undefined;

app.use(express.static('public'));

app.listen(port, () => {
	Gearman.Server.listen({
		port: 4730,
	});
	debug('Gearman listening on port 4730');

	client = Gearman.Client.connect({
		servers: ['127.0.0.1:4730'],
		defaultEncoding: 'utf8',
	});

	if (!fs.existsSync(staticDataTempDir)) {
		fs.mkdirSync(staticDataTempDir);
	}

	Summoner.registerWorkers(client);
	Match.registerWorkers(client);
	StaticData.registerWorkers(client);

	run();
});

const run = async () => {
	// await client.submitJob('updateStaticData', 'ThisIsNecessaryButNotUsed');
	// debug('updateStaticData queued');
	const summonerName = 'Raitono';

	let dbSummoner = undefined;
	try {
		dbSummoner = JSON.parse(await client.submitJob('getSummonerByName', summonerName));
	} catch (error) {
		debug('Unable to update summoner');
		debug(error);
	}

	const updateSummonerResult = JSON.parse(await client.submitJob('determineUpdates', JSON.stringify(dbSummoner)));
	debug('Updated summoner: ' + summonerName);

	if (updateSummonerResult.shouldUpdateMatches) {
		try {
			await client.submitJob('updateMatchList', JSON.stringify(updateSummonerResult.summoner));
			debug('Updated match list for ' + summonerName);
			client.submitJob('updateSummonerLastUpdated', JSON.stringify(updateSummonerResult.summoner));
		} catch (error) {
			debug(error);
		}
	}
};

module.exports = app;
