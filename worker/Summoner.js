const debug = require('debug')('worker:Summoner');

let toUpper = function(task) {
	debug('toUpper');
	return task.payload.toUpperCase();
};



module.exports.registerWorkers = function(worker) {
	worker.registerWorker("toUpper", toUpper);
};