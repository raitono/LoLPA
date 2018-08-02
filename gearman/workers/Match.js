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
let updateMatchList = async function(summoner) {
	try {
		summoner = JSON.parse(summoner);
	} catch (e) {
		debug(e);
	}

	await getMatchList(summoner);

	// We have all the matches. Extract the gameIds.
	let matchBatch = [];
	summoner.matchList.forEach((matchList) => {
		matchBatch.push(matchList.gameId);
	});

	// Send get the matches from RIOT
	let matches = await Promise.all(matchBatch.map(Kayn.Match.get));
	let deltaTypes = JSON.parse(await request(webServer.URLs.DeltaType.getAll()));
	let matchCount = 0;
	let matchInsertBatch = [];
	let matchListBatch = [];
	let summonerGameXrefBatch = [];
	let teamStatBatch = [];
	let teamBanBatch = [];
	let participantBatch = [];
	let statBatch = [];
	let timelineBatch = [];
	let deltaBatch = [];
	let itemBatch =[];
	let perkBatch = [];

	// Batch up the insert options
	matches.forEach( async (match) => {
		matchInsertBatch.push({
			method: 'PUT',
			uri: webServer.URLs.Matches.put(),
			body: {
				gameId: match.gameId,
				seasonId: match.seasonId,
				queueId: match.queueId,
				mapId: match.mapId,
				platformId: match.platformId,
				gameVersion: match.gameVersion,
				gameMode: match.gameMode,
				gameType: match.gameType,
				gameDuration: match.gameDuration,
				gameCreation: match.gameCreation,
			},
			json: true,
		});

		match.teams.forEach((team) => {
			teamStatBatch.push({
				method: 'PUT',
				uri: webServer.URLs.TeamStat.put(),
				body: {
					gameId: match.gameId,
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
					method: 'PUT',
					uri: webServer.URLs.TeamBan.put(),
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
				method: 'PUT',
				uri: webServer.URLs.Participant.put(),
				body: {
					gameId: match.gameId,
					participantId: participant.participantId,
					championId: participant.championId,
					spell1Id: participant.spell1Id,
					spell2Id: participant.spell2Id,
					teamId: participant.teamId,
					highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
				},
				json: true,
			});

			statBatch.push({
				method: 'PUT',
				uri: webServer.URLs.ParticipantStat.put(),
				body: {
					gameId: match.gameId,
					participantId: participant.participantId,
					win: participant.stats.win,
					kills: participant.stats.kills,
					deaths: participant.stats.deaths,
					assists: participant.stats.assists,
					largestKillingSpree: participant.stats.largestKillingSpree,
					killingSprees: participant.stats.killingSprees,
					largestMultiKill: participant.stats.largestMultiKill,
					doubleKills: participant.stats.doubleKills,
					tripleKills: participant.stats.tripleKills,
					quadraKills: participant.stats.quadraKills,
					pentaKills: participant.stats.pentaKills,
					unrealKills: participant.stats.unrealKills,
					physicalDamageDealt: participant.stats.physicalDamageDealt,
					physicalDamageDealtToChampions: participant.stats.physicalDamageDealtToChampions,
					magicDamageDealt: participant.stats.magicDamageDealt,
					magicDamageDealtToChampions: participant.stats.magicDamageDealtToChampions,
					trueDamageDealt: participant.stats.trueDamageDealt,
					trueDamageDealtToChampions: participant.stats.trueDamageDealtToChampions,
					totalDamageDealtToChampions: participant.stats.totalDamageDealtToChampions,
					damageDealtToObjectives: participant.stats.damageDealtToObjectives,
					totalDamageDealt: participant.stats.totalDamageDealt,
					totalUnitsHealed: participant.stats.totalUnitsHealed,
					totalHeal: participant.stats.totalHeal,
					largestCriticalStrike: participant.stats.largestCriticalStrike,
					totalMinionsKilled: participant.stats.totalMinionsKilled,
					neutralMinionsKilled: participant.stats.neutralMinionsKilled,
					neutralMinionsKilledTeamJungle: participant.stats.neutralMinionsKilledTeamJungle,
					neutralMinionsKilledEnemyJungle: participant.stats.neutralMinionsKilledEnemyJungle,
					sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
					visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
					wardsKilled: participant.stats.wardsKilled,
					wardsPlaced: participant.stats.wardsPlaced,
					visionScore: participant.stats.visionScore,
					objectivePlayerScore: participant.stats.objectivePlayerScore,
					combatPlayerScore: participant.stats.combatPlayerScore,
					totalPlayerScore: participant.stats.totalPlayerScore,
					totalScoreRank: participant.stats.totalScoreRank,
					altersCaptured: participant.stats.altersCaptured,
					teamObjective: participant.stats.teamObjective,
					totalTimeCrowdControlDealt: participant.stats.totalTimeCrowdControlDealt,
					timeCCingOthers: participant.stats.timeCCingOthers,
					longestTimeSpentLiving: participant.stats.longestTimeSpentLiving,
					turretKills: participant.stats.turretKills,
					damageDealtToTurrets: participant.stats.damageDealtToTurrets,
					inhibitorKills: participant.stats.inhibitorKills,
					firstTowerAssist: participant.stats.firstTowerAssist,
					firstTowerKill: participant.stats.firstTowerKill,
					firstBloodAssist: participant.stats.firstBloodAssist,
					firstInhibitorKill: participant.stats.firstInhibitorKill,
					firstInhibitorAssist: participant.stats.firstInhibitorAssist,
					firstBloodKill: participant.stats.firstBloodKill,
					champLevel: participant.stats.champLevel,
					nodeNeutralize: participant.stats.nodeNeutralize,
					nodeNeutralizeAssists: participant.stats.nodeNeutralizeAssists,
					nodeCapture: participant.stats.nodeCapture,
					nodeCaptureAssist: participant.stats.nodeCaptureAssist,
					altersNeutralized: participant.stats.altersNeutralized,
					goldEarned: participant.stats.goldEarned,
					goldSpent: participant.stats.goldSpent,
					physicalDamageTaken: participant.stats.physicalDamageTaken,
					magicDamageTaken: participant.stats.magicDamageTaken,
					trueDamageTaken: participant.stats.trueDamageTaken,
					totalDamageTaken: participant.stats.totalDamageTaken,
				},
				json: true,
			});

			timelineBatch.push({
				method: 'PUT',
				uri: webServer.URLs.ParticipantTimeline.put(),
				body: {
					gameId: match.gameId,
					participantId: participant.participantId,
					lane: participant.timeline.lane,
					role: participant.timeline.role,
				},
				json: true,
			});

			deltaTypes.forEach((type) => {
				Object.keys(participant.timeline[type.name]).forEach((increment, value) => {
					deltaBatch.push({
						method: 'PUT',
						uri: webServer.URLs.ParticipantTimelineDelta.put(),
						body: {
							gameId: match.gameId,
							participantId: participant.participantId,
							deltaTypeId: type.id,
							increment: increment,
							value: value,
						},
						json: true,
					});
				});
			});

			let itemCount = 0;
			while (!util.isNullOrUndefined(participant.stats['item'+itemCount])) {
				itemBatch.push({
					method: 'PUT',
					uri: webServer.URLs.XrefParticipantItem.put(),
					body: {
						gameId: match.gameId,
						participantId: participant.participantId,
						itemId: participant.stats['item'+itemCount],
					},
					json: true,
				});

				itemCount = itemCount + 1;
			}

			let perkCount = 0;
			while (!util.isNullOrUndefined(participant.stats['perk'+perkCount])) {
				let perkVarCount = 1;

				while (!util.isNullOrUndefined(participant.stats['perk'+perkCount+'Var'+perkVarCount])) {
					perkBatch.push({
						method: 'PUT',
						uri: webServer.URLs.XrefParticipantPerk.put(),
						body: {
							gameId: match.gameId,
							participantId: participant.participantId,
							perkId: participant.stats['item'+perkCount],
							varId: perkVarCount,
							value: participant.stats['perk'+perkCount+'Var'+perkVarCount],
						},
						json: true,
					});
					perkVarCount = perkVarCount + 1;
				}
				perkCount = perkCount + 1;
				perkVarCount = 1;
			}
		});
	});

	// This is necessary because of the db call in parseMatchParticipantIdentity. Array.ForEach doesn't handle async calls
	while (matchCount < matches.length) {
		await parseMatchParticipantIdentities(matches[matchCount], summonerGameXrefBatch);
		matchCount = matchCount + 1;
	}

	summoner.matchList.forEach((matchList) => {
		matchListBatch.push({
			method: 'PUT',
			uri: webServer.URLs.MatchList.put(),
			body: {
				summonerId: summoner.summonerId,
				gameId: matchList.gameId,
				championId: matchList.champion,
				lane: matchList.lane,
				role: matchList.role,
				timestamp: matchList.timestamp,
			},
			json: true,
		});
	});

	/* statBatch.map(request),
	timelineBatch.map(request),
	deltaBatch.map(request),
	itemBatch.map(request),
	perkBatch.map(request), */

	try {
		// This has to be done separate because of the foreign keys.
		await Promise.all(matchInsertBatch.map(request));
		debug('Match Insert Done');
		await Promise.all(participantBatch.map(request));
		debug('Participant Insert Done');
		await Promise.all(matchListBatch.map(request));
		debug('Match List Insert Done');
		if (summonerGameXrefBatch.length > 0) {
			await Promise.all(summonerGameXrefBatch.map(request));
			debug('SummonerGameXref Insert Done');
		}
		await Promise.all(
			teamStatBatch.map(request),
			teamBanBatch.map(request),
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
let getMatchList = async (summoner, options) => {
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
		riotMatchList = await Kayn.Matchlist.by.accountID(summoner.accountId).query(options);
	} catch (err) {
		if (err.statusCode == 404) {
			// This just means they don't have any matches during the time period
			// so return the options and a null list
			riotMatchList = null;
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
let getMatchDates = async (beginTime, endTime) => {
	if (util.isNullOrUndefined(beginTime)) {
		let dbSeason = await request(webServer.URLs.Season.get('{"endDate": null}'));
		dbSeason = JSON.parse(dbSeason)[0];
		let seasonStart = new Date(dbSeason.startDate).getTime();
		return {
			beginTime: seasonStart,
			endTime: seasonStart + 604800000,
		};
	} else {
		return {
			beginTime: new Date(beginTime).getTime(),
			endTime: new Date(endTime).getTime(),
		};
	}
};

/**
 * Loops through the match's participants and addes them to the summonerGameXrefBatch
 * @param {Object} match The match to parse
 * @param {Array} summonerGameXrefBatch Array of Requests to add the participant to
 */
let parseMatchParticipantIdentities = async (match, summonerGameXrefBatch) => {
	let participantCounter = 0;

	while (participantCounter < match.participantIdentities.length) {
		await parseMatchParticipantIdentity(match.gameId,
			match.participantIdentities[participantCounter],
			summonerGameXrefBatch
		);

		participantCounter = participantCounter + 1;
	}
};

/**
 * Check if the summoner game xref already exists. If not, insert it into the Requests array.
 * This is required because Loopback appends 'ON DUPLICATE UPDATE' to the end of the SQL if we do
 * a simple POST. Notice there is nothing after the UPDATE keyword, this breaks the SQL syntax and
 * causes an error. I think this is because every field in the table is a part of the key.
 * @param {String} gameId The game's ID given by RIOT
 * @param {Object} identity The identity to add
 * @param {Array} summonerGameXrefBatch Array of Requests to add the participant to
 */
let parseMatchParticipantIdentity = async (gameId, identity, summonerGameXrefBatch) => {
	let exists = null;
	try {
		exists = await request(webServer.URLs.XrefSummonerGame.findOne(
			'{"summonerId": "' + identity.player.summonerId + '",' +
			'"gameId": "' + gameId + '",' +
			'"participantId": "' + identity.participantId + '"' +
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
		summonerGameXrefBatch.push({
			method: 'POST',
			uri: webServer.URLs.XrefSummonerGame.post(),
			body: {
				summonerId: identity.player.summonerId,
				gameId: gameId,
				participantId: identity.participantId,
			},
			json: true,
		});
	}
};

module.exports.registerWorkers = (worker) => {
	worker.registerWorker('updateMatchList', async (task) => {
		debug('Update Match List:', JSON.parse(task.payload).name);
		let result = await updateMatchList(task.payload);
		task.end(result);
	});

	debug('Workers registered');
};

