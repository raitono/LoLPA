const mysql = require('mysql');

/** A wrapper for MySQL */
class Database {
	/**
     * Create MySQL connection
     * @param {object} config - JSON object of MySQL properties
     */
	constructor(config) {
		this.connection = mysql.createConnection(config);
	}

	/**
     * Execute a SQL statement
     * @param {string} sql - SQL string to execute
     * @param {array} args - Arguments for the SQL string
     * @return {Promise}
     */
	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		});
	}

	/**
     * Close the MySQL connection
     * @return {Promise}
     */
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end((err) => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	}
}

module.exports = Database;
