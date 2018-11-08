require('dotenv-safe').config();

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

let run = async () => {
	let summonerName = 'Raitono';
	/* await worker.submitJob('updateStaticData', 'ThisIsNecessaryButNotUsed')
	debug('updateStaticData queued'); */

	let shouldUpdateMatches = await client.submitJob('updateSummonerByName', summonerName);
	debug('Updated summoner: ' + summonerName);
	debug(shouldUpdateMatches);

	/* await client.submitJob('updateMatchList', updateSummonerResult);
	debug('Updated match list for ' + dbSummoner.name); */
};

module.exports = app;
