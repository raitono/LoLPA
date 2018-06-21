'use strict';

const kayn = require('../kayn');
const abraxas = require('abraxas');

let gearman = abraxas.Client.connect({ servers: ['127.0.0.1:4730'], defaultEncoding:'utf8' });

module.exports = function(Summoner) {
	Summoner.track = function(name, cb) {
		return new Promise(function(resolve, reject) {
			Summoner.getByNameFromRiot(name)
			.then(function(s) {
				Summoner.create(s)
				.then(function () {
					resolve(201);
				})
				.catch(function(reason){
					if(reason.code === 'ER_DUP_ENTRY'){
						let error = new Error('Tried to track a Summoner already being tracked. AccountId: ' + s.accountId);
						error.statusCode = 409;
						delete error.stack;
						reject(error);
					} else {
						reject(reason);
					}
				});
			})
			.catch(function(reason) {
				if(reason.statusCode === 404){
					let error = new Error('Summoner name doesn\'t exist: ' + name);
					error.statusCode = 404;
					delete error.stack;
					reject(error);
				}
			});
		});
	};
	Summoner.remoteMethod(
		'track', {
			accepts: { arg: 'name', type: 'string', required: true },
			description: 'Add a Summoner to the database and begin tracking them'
		}
	);
	
	Summoner.getByNameFromRiot = function(name) {
		return new Promise(function(resolve, reject) {
			kayn.Summoner.by.name(name)
			.then(function(s){
				resolve(s);
			})
			.catch(function(reason) {
				if(reason.statusCode === 404){
					reject(reason);
				} else {
					console.error(reason);
					reject(reason);
				}
			});
		});
	};
	Summoner.remoteMethod(
		'getByNameFromRiot', {
			http: { path: '/getByNameFromRiot/:name', verb: 'get' },
			accepts: { arg: 'name', type: 'string', required: true },
			returns: { arg: 'Summoner', type: 'object' },
			description: "Retrieve a Summoner from the Riot API by their Summoner name"
		}
	);
};
