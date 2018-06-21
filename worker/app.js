require('dotenv').config();

const debug = require('debug')(process.env.DEBUG + ':app');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Gearman = require('abraxas');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
	Gearman.Server.listen({ port : 4730 });
	
	let worker = Gearman.Client.connect({
		servers : [ '127.0.0.1:4730' ],
		defaultEncoding : 'utf8'
	});
	
	worker.registerWorker("toUpper", function(task) {
		debug(`toUpper: ${task.payload}`);
	    return task.payload.toUpperCase();
	});
	
	debug(`Gearman listening on ${port}`);
});

module.exports = app;