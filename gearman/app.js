require('dotenv-safe').config();

const debug = require('debug')('lolpa-gearman:app');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Gearman = require('abraxas');
const Summoner = require('./workers/Summoner.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
	Gearman.Server.listen({
		port: 4730,
	});

	let worker = Gearman.Client.connect({
		servers: ['127.0.0.1:4730'],
		defaultEncoding: 'utf8',
	});

	Summoner.registerWorkers(worker);

	worker.submitJob('update', 'SushiDojo').then(function(result) {
		debug(result);
	});
});

module.exports = app;
