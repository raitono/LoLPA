const debug = require('debug')('lolpa-gearman:StaticData');
const del = require('del');
const fs = require('fs');
const https = require('https');
const Kayn	= require('../kayn');
const request = require('request-promise-native');
const tar = require('tar');
const util = require('util');

const webServer = require('../util/web-server');

const staticTarballURL = 'https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz';
let latestVersion = '';
fs.readFileAsync = util.promisify(fs.readFile);

/**
 * Retrieve the latest static data tarball from RIOT and upsert it into the database.
 */
const updateStaticData = async function() {
	// Find latest version number
	const versions = await Kayn.DDragon.Version.list();
	latestVersion = versions[0];
	debug('Latest version: ' + latestVersion);

	// Download and extract tarball to temp directory
	const tarballURL = staticTarballURL.replace('{version}', latestVersion);
	debug('terball link: ' + tarballURL);

	const tempTarballPath = './temp/' + latestVersion + '.tgz';
	const tarballPathRoot = './' + latestVersion + '/data/en_US/';

	// For some reason, the Request package gives an Array Buffer error when trying to do this.
	// Guess we do it the old fashioned way.
	const file = fs.createWriteStream(tempTarballPath);
	https.get(tarballURL, (response) => {
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
					parseAndLoad(latestVersion);
				}
			});
		});
	});
};

const parseAndLoad = async (version) => {
	const tempFilePath = './temp/' + version + '/data/en_US/';
	const batches = [];
	const runeStyleBatch = [];
	const championTags = [];
	let runeData = await fs.readFileAsync(tempFilePath + 'runesReforged.json');
	runeData = JSON.parse(runeData);

	runeData.forEach((runeTree) => {
		const runeTreeId = runeTree.id.toString();
		runeStyleBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Rune.put_style(runeTreeId),
			body: {
				styleId: runeTreeId,
				name: runeTree.name,
			},
			json: true,
		});
	});
	await runeStyleBatch.map(request);

	debug('Rune Styles added');

	batches.push(new Promise((resolve, reject) => {
		const runeBatch = [];
		let runeStyleId = '';
		runeData.forEach((runeTree) => {
			runeStyleId = runeTree.id;
			runeTree.slots.forEach((slot) => {
				slot.runes.forEach((rune) => {
					const runeId = rune.id.toString();
					runeBatch.push({
						method: 'PUT',
						uri: webServer.URLs.Rune.put(runeId),
						body: {
							perkId: runeId,
							styleId: runeStyleId.toString(),
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
			const operationsBatch = [];
			const tags = [];
			data = JSON.parse(data);

			// The spicy NONE ban
			operationsBatch.push({
				method: 'PUT',
				uri: webServer.URLs.Champion.put(-1),
				body: {
					championId: -1,
					name: 'None',
					title: 'None',
				},
				json: true,
			});

			// The JSON stores them as properties on the data object, not as an array.
			// So .forEach directly on the data.data doesn't work.
			Object.keys(data.data).forEach((key) => {
				const championId = parseInt(data.data[key].key);
				operationsBatch.push({
					method: 'PUT',
					uri: webServer.URLs.Champion.put(championId),
					body: {
						championId: championId,
						name: data.data[key].name,
						title: data.data[key].title,
					},
					json: true,
				});

				// Save tags
				championTags.push({'championId': championId, 'tags': data.data[key].tags});
			});

			// Toss tags all into one array
			championTags.forEach((championTag) => {
				championTag.tags.forEach((tag) => {
					tags.push(tag);
				});
			});

			// Use the Set type to create a unique array of tags
			const uniqueTags = [...new Set(tags)];

			return request({
				method: 'GET',
				uri: webServer.URLs.ChampionTag.getWhere('{"name": {"inq": ' + JSON.stringify(uniqueTags) + '}}'),
				json: true,
			}).then((existingTags) => {
				uniqueTags.filter((t) => existingTags.findIndex((e) => e.name === t) === -1)
					.forEach((tag) => {
						operationsBatch.push({
							method: 'POST',
							url: webServer.URLs.ChampionTag.post(),
							body: {
								name: tag,
							},
							json: true,
						});
					});

				return Promise.all(operationsBatch.map(request)).then(() => {
					request({
						method: 'GET',
						url: webServer.URLs.ChampionTag.get(),
						json: true,
					}).then((dbTags) => {
						return request({
							method: 'GET',
							url: webServer.URLs.XrefChampionTag.get(),
							json: true,
						}).then((existingXrefs) => {
							const tagXrefBatch = [];
							championTags.forEach((championTag) => {
								championTag.tags.forEach((cTag) => {
									let tagId = dbTags.filter((t) => t.name === cTag);
									// If a crossreference doesn't exist, create it
									if (tagId[0] && !existingXrefs.filter(
										(x) => x.championId === championTag.championId && x.tagId === tagId[0].id)[0]) {
										tagXrefBatch.push({
											method: 'POST',
											url: webServer.URLs.XrefChampionTag.post(),
											body: {
												championId: championTag.championId,
												tagId: tagId[0].id,
											},
											json: true,
										});
									}
								});
							});
							tagXrefBatch.map(request);
						});
					});
				});
			});
		}));

	batches.push(fs.readFileAsync(tempFilePath + 'item.json')
		.then((data) => {
			const itemBatch = [];
			data = JSON.parse(data);

			// Default item
			itemBatch.push({
				method: 'PUT',
				uri: webServer.URLs.Item.put(0),
				body: {
					itemId: 0,
					name: 'None',
					goldSellsFor: 0,
					goldTotal: 0,
					goldBase: 0,
					purchasable: false,
				},
				json: true,
			});

			Object.keys(data.data).forEach((key) => {
				const itemId = parseInt(key);
				itemBatch.push({
					method: 'PUT',
					uri: webServer.URLs.Item.put(itemId),
					body: {
						itemId: itemId,
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
			const summonerSpellBatch = [];
			data = JSON.parse(data);

			Object.keys(data.data).forEach((key) => {
				const spellId = parseInt(data.data[key].key);
				summonerSpellBatch.push({
					method: 'PUT',
					uri: webServer.URLs.SummonerSpell.put(spellId),
					body: {
						spellId: spellId,
						version: latestVersion,
						name: data.data[key].name,
						key: key,
					},
					json: true,
				});
			});
			summonerSpellBatch.map(request);

			debug('Summoner Spells added');
		}));

	// These are my own attempt at normalizing the data.
	batches.push(new Promise((resolve, reject) => {
		const deltaTypeBatch = [];
		const deltaTypes = [
			{id: 1, name: 'creepsPerMinDeltas'},
			{id: 2, name: 'xpPerMinDeltas'},
			{id: 3, name: 'goldPerMinDeltas'},
			{id: 4, name: 'csDiffPerMinDeltas'},
			{id: 5, name: 'xpDiffPerMinDeltas'},
			{id: 6, name: 'damageTakenPerMinDeltas'},
			{id: 7, name: 'damageTakenDiffPerMinDeltas'},
		];

		deltaTypes.forEach((deltaType) => {
			deltaTypeBatch.push({
				method: 'PUT',
				uri: webServer.URLs.DeltaType.put(deltaType.id),
				body: {
					id: deltaType.id,
					name: deltaType.name,
				},
				json: true,
			});
		});

		deltaTypeBatch.map(request);
		debug('Delta Types added');
		resolve();
	}));

	return Promise.all(batches).then(() => {
		debug('batches done');

		// Clean up
		// The glob pattern ** matches all children and the parent
		del(['./temp/' + version + '.tgz', './temp/' + version + '/**'])
			.then(() => {
				debug('Clean up done');
			}).catch((err) => {
				debug(err);
			});
	}).catch((err) => {
		debug('Promise.all error');
		debug(err);
	});
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateStaticData', async (task) => {
		debug('Update Static Data');
		const result = await updateStaticData();
		task.end(result);
	});

	debug('Workers registered');
};
