'use strict';

let kayn = require('../kayn');

module.exports = function(Summoner) {
	Summoner.getByIdFromRiot = async function(accountId) {
		return new Promise(function(resolve, reject) {
			kayn.Summoner.by.accountID(accountId).then(function(s){
				resolve(s);
			})
			.catch(function(reason) {
				console.error(reason);
			});
		});
	};
	Summoner.remoteMethod(
		'getByIdFromRiot', {
			http: { path: '/getByIdFromRiot/:accountId', verb: 'get' },
			accepts: { arg: 'accountId', type: 'number', required: true },
			returns: { arg: 'Summoner', type: 'object' },
			description: "Retrieve a Summoner from the Riot API by their Summoner id"
		}
	);
};
