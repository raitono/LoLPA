const debug = require('debug')('lolpa-gearman:StaticData');
const fs = require('fs');
const https = require('https');
const Kayn	= require('../kayn');
const request = require('request-promise-native');
const tar = require('tar');
const util = require('util');

const webServer = require('../util/web-server');

const staticTarballURL = 'https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz';

fs.readFileAsync = util.promisify(fs.readFile);

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

	let tempTarballPath = './temp/' + latestVersion + '.tgz';
	let tarballPathRoot = './' + latestVersion + '/data/en_US/';
	let tempFilePath = './temp/' + latestVersion + '/data/en_US/';

	// For some reason, the Request package gives an Array Buffer error when trying to do this.
	// Guess we do it the old fashioned way.
	let file = fs.createWriteStream(tempTarballPath);
	await https.get(tarballURL, (response) => {
		response.pipe(file);
		response.on('end', () => {
			debug('tarball saved');

			tar.x({
				gzip: true,
				file: tempTarballPath,
				cwd: './temp',
			},
			[
				tarballPathRoot + 'champion.json',
				tarballPathRoot + 'item.json',
				tarballPathRoot + 'runesReforged.json',
				tarballPathRoot + 'summoner.json',
			]
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
	let batches = [];
	let runeStyleBatch = [];
	let runeData = await fs.readFileAsync(tempFilePath + 'runesReforged.json');
	runeData = JSON.parse(runeData);

	runeData.forEach((runeTree) => {
		runeStyleBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Rune.put_style(),
			body: {
				styleId: runeTree.id,
				name: runeTree.name,
			},
			json: true,
		});
	});
	await runeStyleBatch.map(request);

	debug('Rune Styles added');

	batches.push(new Promise((resolve, reject) => {
		let runeBatch = [];
		let runeStyleId = '';
		runeData.forEach((runeTree) => {
			runeStyleId = runeTree.id;
			runeTree.slots.forEach((slot) => {
				slot.runes.forEach((rune) => {
					runeBatch.push({
						method: 'PUT',
						uri: webServer.URLs.Rune.put(),
						body: {
							perkId: rune.id,
							styleId: runeStyleId,
							name: rune.name,
						},
						json: true,
					});
				});
			});
		});
		runeBatch.map(request);

		debug('Runes added');
		resolve();
	}));

	batches.push(fs.readFileAsync(tempFilePath + 'champion.json')
		.then((data) => {
			let championBatch = [];
			data = JSON.parse(data);

			// The JSON stores them as properties on the data object, not as an array.
			// So .forEach directly on the data.data doesn't work.
			Object.keys(data.data).forEach((key) => {
				championBatch.push({
					method: 'PUT',
					uri: webServer.URLs.Champion.put(),
					body: {
						championId: data.data[key].key,
						name: data.data[key].name,
						title: data.data[key].title,
					},
					json: true,
				});
			});
			championBatch.map(request);

			debug('Champions added');
		}));

	batches.push(fs.readFileAsync(tempFilePath + 'item.json')
		.then((data) => {
			let itemBatch = [];
			data = JSON.parse(data);

			Object.keys(data.data).forEach((key) => {
				itemBatch.push({
					method: 'PUT',
					uri: webServer.URLs.Item.put(),
					body: {
						itemId: key,
						name: data.data[key].name,
						goldSellsFor: data.data[key].gold.sell,
						goldTotal: data.data[key].gold.total,
						goldBase: data.data[key].gold.base,
						purchasable: data.data[key].gold.purchasable,
					},
					json: true,
				});
			});
			itemBatch.map(request);

			debug('Items added');
		}));

	batches.push(fs.readFileAsync(tempFilePath + 'summoner.json')
		.then((data) => {
			let summonerSpellBatch = [];
			data = JSON.parse(data);

			Object.keys(data.data).forEach((key) => {
				summonerSpellBatch.push({
					method: 'PUT',
					uri: webServer.URLs.SummonerSpell.put(),
					body: {
						key: key,
						name: data.data[key].name,
						spellId: data.data[key].key,
					},
					json: true,
				});
			});
			summonerSpellBatch.map(request);

			debug('Summoner Spells added');
		}));

	// These are my own attempt at normalizing the data. These are on an auto increment key.
	batches.push(new Promise((resolve, reject) => {
		let deltaTypeBatch = [];
		let deltaTypes = [
			'creepsPerMinDeltas',
			'xpPerMinDeltas',
			'goldPerMinDeltas',
			'csDiffPerMinDeltas',
			'xpDiffPerMinDeltas',
			'damageTakenPerMinDeltas',
			'damageTakenDiffPerMinDeltas',
		];

		deltaTypes.forEach((deltaType) => {
			deltaTypeBatch.push({
				method: 'PUT',
				uri: webServer.URLs.DeltaType.put(),
				body: {
					name: deltaType,
				},
				json: true,
			});
		});
		deltaTypeBatch.map(request);

		debug('Delta Types added');
		resolve();
	}));

	Promise.all(batches).then(() => {
		debug('batches done');

		// Clean up
		/* try {
			fs.rmdir('./temp/' + latestVersion, () => {
				debug('Temp Dir removed');
			});
			fs.unlink('./temp/' + latestVersion + '.tgz', () => {
				debug('Temp tarball removed');
			});
		} catch (error) {
			debug(error);
		} */
	});
};


module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateStaticData', async (task) => {
		debug('Update Static Data');
		let result = await updateStaticData();
		task.end(result);
	});

	debug('Workers registered');
};
