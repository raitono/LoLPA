const debug = require('debug')('lolpa-gearman:StaticData');
const fs = require('fs');
const https = require('https');
const tar =  require('tar');
const Kayn	= require('../kayn');

const staticTarballURL = 'https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz';

/**
 * Retrieve the latest static data tarball from RIOT and upsert it into the database.
 */
let updateStaticData = async function() {
	// Find latest version number
	let versions = await Kayn.DDragon.Version.list();
	let latestVersion = versions[0];
	debug('Latest version: ' + latestVersion);

	// Download and extract tarball to temp directory
	let tarballURL = staticTarballURL.replace('{version}', latestVersion);
	debug('terball link: ' + tarballURL);

	let tempFilePath = './temp/' + latestVersion + '.tgz';

	// For some reason, the Request package gives an Array Buffer error when trying to do this.
	// Guess we do it the old fashioned way.
	let file = fs.createWriteStream(tempFilePath);
	await https.get(tarballURL, (response) => {
		response.pipe(file);
		response.on('end', () => {
			debug('tarball saved');

			tar.x({
				gzip: true,
				file: tempFilePath,
				cwd: './temp',
			},
			['./languages.js']
			).then((err) => {
				if (err) {
					debug(err);
				} else {
					debug('tarball extracted');
				}
			});
		});
	});

	// Parse and load data
};


module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateStaticData', async (task) => {
		debug('Update Static Data');
		let result = await updateStaticData();
		task.end(result);
	});

	debug('Workers registered');
};
