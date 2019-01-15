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
		uri: webServer.URLs.Match.getWhere('{"gameId": {"inq": ' + JSON.stringify(matchBatch) + '}}'),
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
	const matchInsertBatch = [];
	const matchListBatch = [];
	const teamStatBatch = [];
	const teamBanBatch = [];
	const participantBatch = [];
	const statBatch = [];
	const timelineDeltaBatch = [];
	const itemBatch =[];
	const perkBatch = [];

	// Batch up the insert options
	matches.forEach((match) => {
		const gameId = parseInt(match.gameId);
		matchInsertBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Match.put(gameId),
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
				gameCreation: new Date(match.gameCreation),
			},
			json: true,
		});

		match.teams.forEach((team) => {
			teamStatBatch.push({
				method: 'POST',
				uri: webServer.URLs.TeamStat.post(),
				body: {
					gameId: gameId,
					teamId: team.teamId,
					win: team.win,
					baronKills: team.baronKills,
					riftHeraldKills: team.riftHeraldKills,
					vilemawKills: team.vilemawKills,
					inhibitorKills: team.inhibitorKills,
					towerKills: team.towerKills,
					dragonKills: team.dragonKills,
					dominionVictoryScore: team.dominionVictoryScore,
					firstDragon: team.firstDragon,
					firstInhibitor: team.firstInhibitor,
					firstRiftHerald: team.firstRiftHerald,
					firstBlood: team.firstBlood,
					firstTower: team.firstTower,
				},
				json: true,
			});

			team.bans.forEach((ban) => {
				teamBanBatch.push({
					method: 'POST',
					uri: webServer.URLs.TeamBan.post(),
					body: {
						gameId: match.gameId,
						teamId: team.teamId,
						championId: ban.championId,
						pickTurn: ban.pickTurn,
					},
					json: true,
				});
			});
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
					lane: participant.timeline.lane,
					role: participant.timeline.role,
					teamId: participant.teamId,
					highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
				},
				json: true,
			});
		});
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
				timestamp: new Date(matchList.timestamp),
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

		await transformParticipantDependants(matches, deltaTypes,
			timelineDeltaBatch, statBatch, itemBatch, perkBatch);

		await Promise.all(timelineDeltaBatch.map(request));
		debug('timelineDeltaBatch Insert Done');

		await Promise.all(
			teamStatBatch.map(request),
			teamBanBatch.map(request),
			statBatch.map(request),
			itemBatch.map(request),
			perkBatch.map(request),
		);
	} catch (err) {
		debug(err);
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
 * Iterate over matches again to load deltas. Need Participants loaded first so that we can get their IDs.
 * @param {Array} matches
 * @param {Array} deltaTypes
 * @param {Array} timelineDeltaBatch
 * @param {Array} statBatch
 * @param {Array} itemBatch
 * @param {Array} perkBatch
 */
const transformParticipantDependants = async (matches, deltaTypes,
	timelineDeltaBatch, statBatch, itemBatch, perkBatch) => {
	await Promise.all(matches.map(async (match) => {
		const dbParticipants = await request({
			method: 'GET',
			uri: webServer.URLs.Participant.getWhere('{"gameId": ' + match.gameId + '}'),
			json: true,
		});

		dbParticipants.forEach((dbParticipant) => {
			const dataParticipant = match.participants.filter(
				(p) => p.participantId === dbParticipant.participantId)[0];

			deltaTypes.forEach(async (deltaType) => {
				let timelineKeys = null;

				try {
					timelineKeys = Object.keys(dataParticipant.timeline[deltaType.name]);
				} catch (error) {
					// Happens when the DeltaType doesn't exist in the Timeline.
					// Sometimes we just don't get the info.
					if (error.toString().indexOf('Cannot convert undefined')) {
						return;
					} else {
						throw error;
					}
				}

				timelineKeys.forEach((increment) => {
					const value = dataParticipant.timeline[deltaType.name][increment];
					timelineDeltaBatch.push({
						method: 'POST',
						uri: webServer.URLs.ParticipantTimelineDelta.post(),
						body: {
							participantId: dbParticipant.id,
							deltaTypeId: deltaType.id,
							increment: increment,
							value: value,
						},
						json: true,
					});
				});
			});

			statBatch.push({
				method: 'POST',
				uri: webServer.URLs.ParticipantStat.post(),
				body: {
					participantId: dbParticipant.id,
					win: dataParticipant.stats.win,
					kills: dataParticipant.stats.kills,
					deaths: dataParticipant.stats.deaths,
					assists: dataParticipant.stats.assists,
					largestKillingSpree: dataParticipant.stats.largestKillingSpree,
					killingSprees: dataParticipant.stats.killingSprees,
					largestMultiKill: dataParticipant.stats.largestMultiKill,
					doubleKills: dataParticipant.stats.doubleKills,
					tripleKills: dataParticipant.stats.tripleKills,
					quadraKills: dataParticipant.stats.quadraKills,
					pentaKills: dataParticipant.stats.pentaKills,
					unrealKills: dataParticipant.stats.unrealKills,
					physicalDamageDealt: dataParticipant.stats.physicalDamageDealt,
					physicalDamageDealtToChampions: dataParticipant.stats.physicalDamageDealtToChampions,
					magicDamageDealt: dataParticipant.stats.magicDamageDealt,
					magicDamageDealtToChampions: dataParticipant.stats.magicDamageDealtToChampions,
					trueDamageDealt: dataParticipant.stats.trueDamageDealt,
					trueDamageDealtToChampions: dataParticipant.stats.trueDamageDealtToChampions,
					totalDamageDealtToChampions: dataParticipant.stats.totalDamageDealtToChampions,
					damageDealtToObjectives: dataParticipant.stats.damageDealtToObjectives,
					totalDamageDealt: dataParticipant.stats.totalDamageDealt,
					totalUnitsHealed: dataParticipant.stats.totalUnitsHealed,
					totalHeal: dataParticipant.stats.totalHeal,
					largestCriticalStrike: dataParticipant.stats.largestCriticalStrike,
					totalMinionsKilled: dataParticipant.stats.totalMinionsKilled,
					neutralMinionsKilled: dataParticipant.stats.neutralMinionsKilled,
					neutralMinionsKilledTeamJungle: dataParticipant.stats.neutralMinionsKilledTeamJungle || 0, // These could be undefined if neutralMinions is 0
					neutralMinionsKilledEnemyJungle: dataParticipant.stats.neutralMinionsKilledEnemyJungle || 0,
					sightWardsBoughtInGame: dataParticipant.stats.sightWardsBoughtInGame,
					visionWardsBoughtInGame: dataParticipant.stats.visionWardsBoughtInGame,
					wardsKilled: dataParticipant.stats.wardsKilled || 0,
					wardsPlaced: dataParticipant.stats.wardsPlaced || 0,
					visionScore: dataParticipant.stats.visionScore,
					objectivePlayerScore: dataParticipant.stats.objectivePlayerScore,
					combatPlayerScore: dataParticipant.stats.combatPlayerScore,
					totalPlayerScore: dataParticipant.stats.totalPlayerScore,
					totalScoreRank: dataParticipant.stats.totalScoreRank,
					altarsCaptured: dataParticipant.stats.altarsCaptured || 0,
					teamObjective: dataParticipant.stats.teamObjective || 0,
					totalTimeCrowdControlDealt: dataParticipant.stats.totalTimeCrowdControlDealt,
					timeCCingOthers: dataParticipant.stats.timeCCingOthers,
					longestTimeSpentLiving: dataParticipant.stats.longestTimeSpentLiving,
					turretKills: dataParticipant.stats.turretKills,
					damageDealtToTurrets: dataParticipant.stats.damageDealtToTurrets,
					inhibitorKills: dataParticipant.stats.inhibitorKills,
					firstTowerAssist: dataParticipant.stats.firstTowerAssist || false,
					firstTowerKill: dataParticipant.stats.firstTowerKill || false,
					firstBloodAssist: dataParticipant.stats.firstBloodAssist || false,
					firstInhibitorKill: dataParticipant.stats.firstInhibitorKill || false,
					firstInhibitorAssist: dataParticipant.stats.firstInhibitorAssist || false,
					firstBloodKill: dataParticipant.stats.firstBloodKill || false,
					champLevel: dataParticipant.stats.champLevel,
					nodeNeutralize: dataParticipant.stats.nodeNeutralize || 0,
					nodeNeutralizeAssist: dataParticipant.stats.nodeNeutralizeAssists || 0,
					nodeCapture: dataParticipant.stats.nodeCapture || 0,
					nodeCaptureAssist: dataParticipant.stats.nodeCaptureAssist || 0,
					altarsNeutralized: dataParticipant.stats.altarsNeutralized || 0,
					goldEarned: dataParticipant.stats.goldEarned,
					goldSpent: dataParticipant.stats.goldSpent || 0,
					physicalDamageTaken: dataParticipant.stats.physicalDamageTaken,
					magicalDamageTaken: dataParticipant.stats.magicalDamageTaken,
					trueDamageTaken: dataParticipant.stats.trueDamageTaken,
					totalDamageTaken: dataParticipant.stats.totalDamageTaken,
					perkPrimaryStyle: dataParticipant.stats.perkPrimaryStyle,
					perkSubStyle: dataParticipant.stats.perkSubStyle,
				},
				json: true,
			});

			let itemCount = 0;
			while (!util.isNullOrUndefined(dataParticipant.stats['item'+itemCount])) {
				itemBatch.push({
					method: 'POST',
					uri: webServer.URLs.XrefParticipantItem.post(),
					body: {
						participantId: dbParticipant.id,
						itemId: dataParticipant.stats['item'+itemCount],
					},
					json: true,
				});

				itemCount = itemCount + 1;
			}

			let perkCount = 0;
			while (!util.isNullOrUndefined(dataParticipant.stats['perk'+perkCount])) {
				let perkVarCount = 1;

				while (!util.isNullOrUndefined(dataParticipant.stats['perk'+perkCount+'Var'+perkVarCount])) {
					perkBatch.push({
						method: 'POST',
						uri: webServer.URLs.XrefParticipantPerk.post(),
						body: {
							participantId: dbParticipant.id,
							perkId: dataParticipant.stats['perk'+perkCount].toString(),
							varId: perkVarCount,
							value: dataParticipant.stats['perk'+perkCount+'Var'+perkVarCount],
						},
						json: true,
					});
					perkVarCount = perkVarCount + 1;
				}
				perkCount = perkCount + 1;
				perkVarCount = 1;
			}
		});
	}));
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateMatchList', async (task) => {
		debug('Update Match List:', JSON.parse(task.payload).name);
		const result = await updateMatchList(task.payload);
		task.end(result);
	});

	debug('Workers registered');
};

