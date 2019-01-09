const util = require('util');

/**
 * Expands milliseconds to a string date
 * @param {number} date Date in milliseconds
 * @return {string}
 */
const parseDate = (date) => {
	const d = new Date(date);

	return d.getFullYear() + '-'
		+ ('0' + d.getDate()).substr(('0' + d.getDate()).length - 2) + '-'
		+ ('0' + (d.getMonth()+1)).substr(('0' + (d.getMonth()+1)).length - 2) + 'T'
		+ ('0' + d.getHours()).substr(('0' + d.getHours()).length - 2) + ':'
		+ ('0' + d.getMinutes()).substr(('0' + d.getMinutes()).length - 2) + ':'
		+ ('0' + d.getSeconds()).substr(('0' + d.getSeconds()).length - 2) + '.000Z';
};

util.parseDate = parseDate;
