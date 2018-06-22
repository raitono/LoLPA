/*
 *	CronJob time format:
 *	Seconds: 0-59
 *	Minutes: 0-59
 *	Hours: 0-23
 *	Day of Month: 1-31
 *	Months: 0-11 (Jan-Dec)
 *	Day of Week: 0-6 (Sun-Sat)
 *	Asterisk. E.g. *
 *	Ranges. E.g. 1-3,5 */
 //	Steps. E.g. */2

'use strict';

let CronJob = require('cron').CronJob;

module.exports.start = function() {
	/* var job = new CronJob('* * * * * 1', function () {
		console.log('Cronjob running');
	}, function () {
		console.log('Cronjob stopped');
	},true); */
};
