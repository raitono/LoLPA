const util = require('util');

const debug = require('debug')('lolpa-gearman:Match');
const request = require('request-promise-native');
const Kayn	= require('../kayn');

const webServer = require('../util/web-server');

/**
 * Pull new matches and add them to the database
 * @param {Object} summoner Summoner whose matches we are updating
 * @param {Object} options JSON options containing beginTime and endTime in UNIX milliseconds
 */
const updateMatchList = async function(summoner) {
	try {
		summoner = JSON.parse(summoner);
	} catch (e) {
		debug(e);
	}

	await getMatchList(summoner);

	if (!summoner.matchList) {
		debug('No matchList');
		return;
	}

	// We have all the matches. Extract the gameIds.
	let matchBatch = [];
	summoner.matchList.forEach((matchList) => {
		matchBatch.push(matchList.gameId);
	});

	const existingMatches = await request({
		method: 'GET',
		uri: webServer.URLs.Matches.getWhere('{"gameId": {"inq": ' + JSON.stringify(matchBatch) + '}}'),
		json: true,
	});
	matchBatch = matchBatch.filter((m) => existingMatches.findIndex((e) => e.gameId === m) === -1);

	if (util.isNullOrUndefined(matchBatch[0])) {
		debug('All matches already exist');
		return;
	}

	// Get the matches from RIOT
	const matches = await Promise.all(matchBatch.map(Kayn.MatchV4.get));
	const deltaTypes = JSON.parse(await request(webServer.URLs.DeltaType.getAll()));
	let matchCount = 0;
	const matchInsertBatch = [];
	const matchListBatch = [];
	const teamStatBatch = [];
	const teamBanBatch = [];
	const participantBatch = [];
	const statBatch = [];
	const timelineBatch = [];
	const timelineDeltaBatch = [];
	const itemBatch =[];
	const perkBatch = [];

	// Batch up the insert options
	matches.forEach( async (match) => {
		const gameId = parseInt(match.gameId);
		matchInsertBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Matches.put(gameId),
			body: {
				gameId: gameId,
				seasonId: match.seasonId,
				queueId: match.queueId,
				mapId: match.mapId,
				platformId: match.platformId,
				gameVersion: match.gameVersion,
				gameMode: match.gameMode,
				gameType: match.gameType,
				gameDuration: match.gameDuration,
				gameCreation: util.parseDate(match.gameCreation),
			},
			json: true,
		});

		match.participants.forEach((participant) => {
			participantBatch.push({
				method: 'POST',
				uri: webServer.URLs.Participant.post(),
				body: {
					gameId: gameId,
					participantId: participant.participantId,
					accountId: match.participantIdentities.filter(
						(i) => i.participantId === participant.participantId)[0].player.accountId,
					championId: participant.championId,
					spell1Id: participant.spell1Id,
					spell2Id: participant.spell2Id,
					teamId: participant.teamId,
					highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
				},
				json: true,
			});
		});

		// match.teams.forEach((team) => {
		// 	teamStatBatch.push({
		// 		method: 'POST',
		// 		uri: webServer.URLs.TeamStat.post(),
		// 		body: {
		// 			gameId: gameId,
		// 			teamId: team.teamId,
		// 			win: team.win,
		// 			baronKills: team.baronKills,
		// 			riftHeraldKills: team.riftHeraldKills,
		// 			vilemawKills: team.vilemawKills,
		// 			inhibitorKills: team.inhibitorKills,
		// 			towerKills: team.towerKills,
		// 			dragonKills: team.dragonKills,
		// 			dominionVictoryScore: team.dominionVictoryScore,
		// 			firstDragon: team.firstDragon,
		// 			firstInhibitor: team.firstInhibitor,
		// 			firstRiftHerald: team.firstRiftHerald,
		// 			firstBlood: team.firstBlood,
		// 			firstTower: team.firstTower,
		// 		},
		// 		json: true,
		// 	});

		// 	team.bans.forEach((ban) => {
		// 		teamBanBatch.push({
		// 			method: 'PUT',
		// 			uri: webServer.URLs.TeamBan.put(),
		// 			body: {
		// 				gameId: match.gameId,
		// 				teamId: team.teamId,
		// 				championId: ban.championId,
		// 				pickTurn: ban.pickTurn,
		// 			},
		// 			json: true,
		// 		});
		// 	});

		// 	statBatch.push({
		// 		method: 'PUT',
		// 		uri: webServer.URLs.ParticipantStat.put(),
		// 		body: {
		// 			gameId: match.gameId,
		// 			participantId: participant.participantId,
		// 			win: participant.stats.win,
		// 			kills: participant.stats.kills,
		// 			deaths: participant.stats.deaths,
		// 			assists: participant.stats.assists,
		// 			largestKillingSpree: participant.stats.largestKillingSpree,
		// 			killingSprees: participant.stats.killingSprees,
		// 			largestMultiKill: participant.stats.largestMultiKill,
		// 			doubleKills: participant.stats.doubleKills,
		// 			tripleKills: participant.stats.tripleKills,
		// 			quadraKills: participant.stats.quadraKills,
		// 			pentaKills: participant.stats.pentaKills,
		// 			unrealKills: participant.stats.unrealKills,
		// 			physicalDamageDealt: participant.stats.physicalDamageDealt,
		// 			physicalDamageDealtToChampions: participant.stats.physicalDamageDealtToChampions,
		// 			magicDamageDealt: participant.stats.magicDamageDealt,
		// 			magicDamageDealtToChampions: participant.stats.magicDamageDealtToChampions,
		// 			trueDamageDealt: participant.stats.trueDamageDealt,
		// 			trueDamageDealtToChampions: participant.stats.trueDamageDealtToChampions,
		// 			totalDamageDealtToChampions: participant.stats.totalDamageDealtToChampions,
		// 			damageDealtToObjectives: participant.stats.damageDealtToObjectives,
		// 			totalDamageDealt: participant.stats.totalDamageDealt,
		// 			totalUnitsHealed: participant.stats.totalUnitsHealed,
		// 			totalHeal: participant.stats.totalHeal,
		// 			largestCriticalStrike: participant.stats.largestCriticalStrike,
		// 			totalMinionsKilled: participant.stats.totalMinionsKilled,
		// 			neutralMinionsKilled: participant.stats.neutralMinionsKilled,
		// 			neutralMinionsKilledTeamJungle: participant.stats.neutralMinionsKilledTeamJungle || 0, // These could be undefined if neutralMinions is 0
		// 			neutralMinionsKilledEnemyJungle: participant.stats.neutralMinionsKilledEnemyJungle || 0,
		// 			sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
		// 			visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
		// 			wardsKilled: participant.stats.wardsKilled || 0,
		// 			wardsPlaced: participant.stats.wardsPlaced || 0,
		// 			visionScore: participant.stats.visionScore,
		// 			objectivePlayerScore: participant.stats.objectivePlayerScore,
		// 			combatPlayerScore: participant.stats.combatPlayerScore,
		// 			totalPlayerScore: participant.stats.totalPlayerScore,
		// 			totalScoreRank: participant.stats.totalScoreRank,
		// 			altarsCaptured: participant.stats.altarsCaptured || 0,
		// 			teamObjective: participant.stats.teamObjective || 0,
		// 			totalTimeCrowdControlDealt: participant.stats.totalTimeCrowdControlDealt,
		// 			timeCCingOthers: participant.stats.timeCCingOthers,
		// 			longestTimeSpentLiving: participant.stats.longestTimeSpentLiving,
		// 			turretKills: participant.stats.turretKills,
		// 			damageDealtToTurrets: participant.stats.damageDealtToTurrets,
		// 			inhibitorKills: participant.stats.inhibitorKills,
		// 			firstTowerAssist: participant.stats.firstTowerAssist || 0,
		// 			firstTowerKill: participant.stats.firstTowerKill || 0,
		// 			firstBloodAssist: participant.stats.firstBloodAssist || 0,
		// 			firstInhibitorKill: participant.stats.firstInhibitorKill || 0,
		// 			firstInhibitorAssist: participant.stats.firstInhibitorAssist || 0,
		// 			firstBloodKill: participant.stats.firstBloodKill || 0,
		// 			champLevel: participant.stats.champLevel,
		// 			nodeNeutralize: participant.stats.nodeNeutralize || 0,
		// 			nodeNeutralizeAssist: participant.stats.nodeNeutralizeAssists || 0,
		// 			nodeCapture: participant.stats.nodeCapture || 0,
		// 			nodeCaptureAssist: participant.stats.nodeCaptureAssist || 0,
		// 			altarsNeutralized: participant.stats.altarsNeutralized || 0,
		// 			goldEarned: participant.stats.goldEarned,
		// 			goldSpent: participant.stats.goldSpent || 0,
		// 			physicalDamageTaken: participant.stats.physicalDamageTaken,
		// 			magicalDamageTaken: participant.stats.magicalDamageTaken,
		// 			trueDamageTaken: participant.stats.trueDamageTaken,
		// 			totalDamageTaken: participant.stats.totalDamageTaken,
		// 			perkPrimaryStyle: participant.stats.perkPrimaryStyle,
		// 			perkSubStyle: participant.stats.perkSubStyle,
		// 		},
		// 		json: true,
		// 	});

		// 	timelineBatch.push({
		// 		method: 'PUT',
		// 		uri: webServer.URLs.ParticipantTimeline.put(),
		// 		body: {
		// 			gameId: match.gameId,
		// 			participantId: participant.participantId,
		// 			lane: participant.timeline.lane,
		// 			role: participant.timeline.role,
		// 		},
		// 		json: true,
		// 	});

		// 	let itemCount = 0;
		// 	while (!util.isNullOrUndefined(participant.stats['item'+itemCount])) {
		// 		itemBatch.push({
		// 			method: 'PUT',
		// 			uri: webServer.URLs.XrefParticipantItem.put(),
		// 			body: {
		// 				gameId: match.gameId,
		// 				participantId: participant.participantId,
		// 				itemId: participant.stats['item'+itemCount],
		// 			},
		// 			json: true,
		// 		});

		// 		itemCount = itemCount + 1;
		// 	}

		// 	let perkCount = 0;
		// 	while (!util.isNullOrUndefined(participant.stats['perk'+perkCount])) {
		// 		let perkVarCount = 1;

		// 		while (!util.isNullOrUndefined(participant.stats['perk'+perkCount+'Var'+perkVarCount])) {
		// 			perkBatch.push({
		// 				method: 'PUT',
		// 				uri: webServer.URLs.XrefParticipantPerk.put(),
		// 				body: {
		// 					gameId: match.gameId,
		// 					participantId: participant.participantId,
		// 					perkId: participant.stats['perk'+perkCount],
		// 					varId: perkVarCount,
		// 					value: participant.stats['perk'+perkCount+'Var'+perkVarCount],
		// 				},
		// 				json: true,
		// 			});
		// 			perkVarCount = perkVarCount + 1;
		// 		}
		// 		perkCount = perkCount + 1;
		// 		perkVarCount = 1;
		// 	}
		// });
	});

	summoner.matchList.forEach((matchList) => {
		matchListBatch.push({
			method: 'POST',
			uri: webServer.URLs.MatchList.post(),
			body: {
				summonerPUUID: summoner.puuid,
				gameId: parseInt(matchList.gameId),
				championId: matchList.champion,
				lane: matchList.lane,
				role: matchList.role,
				timestamp: util.parseDate(matchList.timestamp),
			},
			json: true,
		});
	});

	try {
		// This has to be done separate because of the foreign keys.
		await Promise.all(matchInsertBatch.map(request));
		debug('Match Insert Done');
		await Promise.all([matchListBatch.map(request), participantBatch.map(request)]);
		debug('Match List Insert Done');
		debug('Participant Insert Done');

		// This is necessary because of the db call in parseMatchParticipantIdentity.
		// Array.ForEach doesn't handle async calls well. It will return before the DB operation completes
		// while (matchCount < matches.length) {
		// 	const dbParticipants = await request({
		// 		method: 'GET',
		// 		uri: webServer.URLs.Participant.getWhere('{"gameId": ' + matches[matchCount].gameId + '}'),
		// 		json: true,
		// 	});

		// 	await parseMatchParticipantWithDuplicateCheck(
		// 		matches[matchCount],
		// 		timelineDeltaBatch,
		// 		deltaTypes,
		// 		dbParticipants
		// 	);
		// 	matchCount = matchCount + 1;
		// }

		// if (timelineDeltaBatch.length > 0) {
		// 	await Promise.all(timelineDeltaBatch.map(request));
		// 	debug('timelineDeltaBatch Insert Done');
		// }
		// await Promise.all(
		// 	teamStatBatch.map(request),
		// 	teamBanBatch.map(request),
		// 	statBatch.map(request),
		// 	timelineBatch.map(request),
		// 	itemBatch.map(request),
		// 	perkBatch.map(request),
		// );
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			// shh, don't tell them we already have it
			// Does this stop processing? We probably don't want that.
			// Might want to compare the match list at the beginning to make sure
		} else {
			debug(err);
		}
	}
};

/**
 * Gets a matchlist from RIOT based on the options passed. Uses the summoner's lastUpdated and
 * revisionDate if no options are passed.
 * @param {Object} summoner Summoner to get matches for
 * @param {Object} options Object with beginTime and endTime to specify the dates to find matches
 * @return {Object} MatchList object from RIOT API
 */
const getMatchList = async (summoner, options) => {
	if (!util.isObject(summoner)) {
		try {
			summoner = JSON.parse(summoner);
		} catch (e) {
			debug(e);
		}
	}

	if (util.isNullOrUndefined(options)) {
		options = {
			beginTime: null,
			endTime: null,
		};
	}

	// Determine the dates to pull
	options = await getMatchDates(options.beginTime || summoner.lastUpdated,
		options.endTime || summoner.revisionDate);

	let riotMatchList = null;
	try {
		// Send request to RIOT API
		riotMatchList = await Kayn.MatchlistV4.by.accountID(summoner.accountId).query(options);
	} catch (err) {
		if (err.statusCode == 404) {
			// This just means they don't have any matches during the time period
			// so return the options and a null list
			riotMatchList = null;
		} else if (err.statusCode == 400) {
			debug('Bad dates');
			debug('BeginTime: ' + options.beginTime);
			debug('EndTime:   ' + options.endTime);
		} else {
			debug('Problem calling Kayn');
			debug(err);
		}
	}

	// Determine if we can stop the recursive loop
	if (options.beginTime < new Date(summoner.revisionDate).getTime()) {
		// We are not done yet
		if (util.isNullOrUndefined(summoner.matchList)) {
			summoner.matchList = [];
		}

		if (!util.isNullOrUndefined(riotMatchList)) {
			Array.prototype.push.apply(summoner.matchList, riotMatchList.matches);
		}

		// Call the recursive function, but with update options and the match list attached to the summoner
		return getMatchList(summoner, {
			beginTime: options.endTime,
			endTime: options.endTime + 604800000, // Add a week, the max allowed time by RIOT API
		});
	} else {
		// We're done. Finish the loop.
		return;
	}
};

/**
 * @param {long} beginTime UNIX milliseconds representing the last time the Summoner was updated
 * @param {long} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @return {Object} JSON object containing beginTime and endTime to be used with a match method
 */
const getMatchDates = async (beginTime, endTime) => {
	let dates = {};
	if (util.isNullOrUndefined(beginTime)) {
		let dbSeason = await request(webServer.URLs.Season.getWhere('{"isCurrent":1}'));
		dbSeason = JSON.parse(dbSeason);
		dbSeason = dbSeason[0];
		const seasonStart = new Date(dbSeason.startDate).getTime();
		dates = {
			beginTime: seasonStart,
			endTime: seasonStart + 604800000,
		};
	} else {
		dates = {
			beginTime: new Date(beginTime).getTime(),
			endTime: new Date(endTime).getTime(),
		};
	}

	if (dates.beginTime > dates.endTime) {
		dates.endTime = dates.beginTime;
	}

	return dates;
};

/**
 * Loops through the match's participants and parse them into the relevant batches
 * @param {Object} match The match to parse
 * @param {Array} participantSummonerXrefBatch Array of Requests to add the participant to
 * @param {Array} timelineDeltaBatch Array of Requests to add the delta to
 * @param {Array} deltaTypes
 * @param {Array} dbParticipants
 */
const parseMatchParticipantWithDuplicateCheck = async (match,
	participantSummonerXrefBatch, timelineDeltaBatch, deltaTypes, dbParticipants) => {
	let participantCounter = 0;
	let deltaTypeCounter = 0;

	while (participantCounter < match.participantIdentities.length) {
		deltaTypeCounter = 0;

		// while (deltaTypeCounter < deltaTypes.length) {
		// 	await parseMatchParticipantTimelineDelta(match.gameId, deltaTypes[deltaTypeCounter],
		// 		match.participants[participantCounter].timeline,
		// 		timelineDeltaBatch
		// 	);

		// 	deltaTypeCounter = deltaTypeCounter + 1;
		// }

		participantCounter = participantCounter + 1;
	}
};

/**
 * Check if the timeline delta already exists. If not, insert it into the Requests array.
 * This is required because Loopback appends 'ON DUPLICATE UPDATE' to the end of the SQL if we do
 * a simple POST. Notice there is nothing after the UPDATE keyword, this breaks the SQL syntax and
 * causes an error. I think this is because every field in the table is a part of the key.
 * @param {String} gameId The game's ID given by RIOT
 * @param {Array} deltaType Delta type name used to pull the values from the timeline
 * @param {Object} timeline The timeline to add
 * @param {Array} timelineDeltaBatch Array of Requests to add the delta to
 */
const parseMatchParticipantTimelineDelta = async (gameId, deltaType,
	timeline, timelineDeltaBatch) => {
	let exists = null;
	let timelineKeys = null;
	let timelineKeysCounter = 0;

	try {
		timelineKeys = Object.keys(timeline[deltaType.name]);
	} catch (error) {
		// Happens when the DeltaType doesn't exist in the Timeline.
		// Sometimes we just don't get the info.
		if (error.toString().indexOf('Cannot convert undefined')) {
			return;
		} else {
			throw error;
		}
	}

	while (timelineKeysCounter < timelineKeys.length) {
		const increment = timelineKeys[timelineKeysCounter];
		const value = timeline[deltaType.name][increment];
		exists = null;

		try {
			exists = await request(webServer.URLs.ParticipantTimelineDelta.findOne(
				'{"gameId": "' + gameId + '",' +
				'"participantId": "' + timeline.participantId + '",' +
				'"deltaTypeId": "' + deltaType.id + '",' +
				'"increment": "' + increment + '"' +
				'}'));

			if (JSON.parse(exists)) {
				exists = true;
			}
		} catch (error) {
			// It does this when there are no records in the database,
			// so will only happen the first time.
			if (error.toString().indexOf('MODEL_NOT_FOUND')) {
				exists = false;
			} else {
				throw error;
			}
		}

		if (!exists) {
			timelineDeltaBatch.push({
				method: 'PUT',
				uri: webServer.URLs.ParticipantTimelineDelta.put(),
				body: {
					gameId: gameId,
					participantId: timeline.participantId,
					deltaTypeId: deltaType.id,
					increment: increment,
					value: value,
				},
				json: true,
			});
		}

		timelineKeysCounter = timelineKeysCounter + 1;
	}
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateMatchList', async (task) => {
		debug('Update Match List:', JSON.parse(task.payload).name);
		const result = await updateMatchList(task.payload);
		task.end(result);
	});

	debug('Workers registered');
};

