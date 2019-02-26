// 3rd party imports
import requestPromiseNative = require("request-promise-native");
import * as util from "util";
import Kayn = require("../kayn");

// my imports
import { batchRequest, request } from "../util/common";
import * as WebServer from "../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Match");
const serverURLs = new WebServer.URLs();

/**
 * Pull new matches and add them to the database
 * @param {string} summonerJSON Summoner whose matches we are updating
 */
const updateMatchList = async (summonerJSON: string) => {
    let summoner: any;
    try {
        summoner = JSON.parse(summonerJSON);
    } catch (e) {
        debug("Unable to parse summoner");
        debug(e);
        return;
    }

    await getMatchList(summoner, {});

    if (!summoner.matchList) {
        debug("No matchList");
        return;
    }

    debug("Gathered " + summoner.matchList.length + " matches");

    // We have all the matches. Extract the gameIds.
    let matchBatch = [];
    summoner.matchList.forEach((matchList) => {
        matchBatch.push(matchList.gameId);
    });

    const existingMatches = await request({
        json: true,
        method: "GET",
        uri: serverURLs.Match.getWhere("{\"gameId\": {\"inq\": " + JSON.stringify(matchBatch) + "}}"),
    });
    matchBatch = matchBatch.filter((m) => existingMatches.findIndex((e) => e.gameId === m) === -1);

    if (util.isNullOrUndefined(matchBatch[0])) {
        debug("All matches already exist");
        return;
    }

    // Get the matches from RIOT
    debug("Getting matches from Riot API");
    const matches: any[] = await Promise.all(matchBatch.map(Kayn.MatchV4.get));
    const deltaTypes = JSON.parse(await request({uri: serverURLs.DeltaType.getAll()}));
    const matchInsertBatch = [];
    const matchListBatch = [];
    const teamStatBatch = [];
    const teamBanBatch = [];
    const participantBatch = [];
    const statBatch = [];
    const timelineDeltaBatch = [];
    const itemBatch = [];
    const perkBatch = [];

    // Batch up the insert options
    matches.forEach((match) => {
        const gameId = parseInt(match.gameId);
        matchInsertBatch.push({
            body: {
                gameCreation: new Date(match.gameCreation),
                gameDuration: match.gameDuration,
                gameId,
                gameMode: match.gameMode,
                gameType: match.gameType,
                gameVersion: match.gameVersion,
                mapId: match.mapId,
                platformId: match.platformId,
                queueId: match.queueId,
                seasonId: match.seasonId,
            },
            json: true,
            method: "PUT",
            uri: serverURLs.Match.put(gameId),
        });

        match.teams.forEach((team) => {
            teamStatBatch.push({
                body: {
                    baronKills: team.baronKills,
                    dominionVictoryScore: team.dominionVictoryScore,
                    dragonKills: team.dragonKills,
                    firstBlood: team.firstBlood,
                    firstDragon: team.firstDragon,
                    firstInhibitor: team.firstInhibitor,
                    firstRiftHerald: team.firstRiftHerald,
                    firstTower: team.firstTower,
                    gameId,
                    inhibitorKills: team.inhibitorKills,
                    riftHeraldKills: team.riftHeraldKills,
                    teamId: team.teamId,
                    towerKills: team.towerKills,
                    vilemawKills: team.vilemawKills,
                    win: team.win,
                },
                json: true,
                method: "POST",
                uri: serverURLs.TeamStat.post(),
            });

            team.bans.forEach((ban) => {
                teamBanBatch.push({
                    body: {
                        championId: ban.championId,
                        gameId: match.gameId,
                        pickTurn: ban.pickTurn,
                        teamId: team.teamId,
                    },
                    json: true,
                    method: "POST",
                    uri: serverURLs.TeamBan.post(),
                });
            });
        });

        match.participants.forEach((participant) => {
            participantBatch.push({
                body: {
                    accountId: match.participantIdentities.filter(
                        (i) => i.participantId === participant.participantId)[0].player.accountId,
                    championId: participant.championId,
                    gameId,
                    highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
                    lane: participant.timeline.lane,
                    participantId: participant.participantId,
                    role: participant.timeline.role,
                    spell1Id: participant.spell1Id,
                    spell2Id: participant.spell2Id,
                    teamId: participant.teamId,
                },
                json: true,
                method: "POST",
                uri: serverURLs.Participant.post(),
            });
        });
    });

    summoner.matchList.forEach((matchList) => {
        matchListBatch.push({
            body: {
                championId: matchList.champion,
                gameId: parseInt(matchList.gameId),
                lane: matchList.lane,
                role: matchList.role,
                summonerPUUID: summoner.puuid,
                timestamp: new Date(matchList.timestamp),
            },
            json: true,
            method: "POST",
            uri: serverURLs.MatchList.post(),
        });
    });

    try {
        // This has to be done separate because of the foreign keys.
        debug("Inserting " + matchInsertBatch.length + " matches");
        await Promise.all(matchInsertBatch.map(request));
        debug("Match Insert Done");
        debug("Inserting " + matchListBatch.length + " match lists");
        debug("Inserting " + participantBatch.length + " participants");
        await Promise.all([matchListBatch.map(request), participantBatch.map(request)]);
        debug("Match List Insert Done");
        debug("Participant Insert Done");

        await transformParticipantDependants(matches, deltaTypes,
            timelineDeltaBatch, statBatch, itemBatch, perkBatch);

        debug("Inserting " + timelineDeltaBatch.length + " timeline deltas");
        await batchRequest(timelineDeltaBatch);
        debug("timelineDeltaBatch Insert Done");

        // Break these up to avoid overloading server and getting ECONNRESET error
        // debug("Inserting " + teamStatBatch.length + " team stats");
        // await Promise.all([teamStatBatch.map(request)]);
        // debug("teamStatBatch Insert Done");
        // debug("Inserting " + teamBanBatch.length + " team bans");
        // await Promise.all([teamBanBatch.map(request)]);
        // debug("teamBanBatch Insert Done");
        // debug("Inserting " + statBatch.length + " participant stats");
        // await Promise.all([statBatch.map(request)]);
        // debug("statBatch Insert Done");
        // debug("Inserting " + itemBatch.length + " participant items");
        // await Promise.all([itemBatch.map(request)]);
        // debug("itemBatch Insert Done");
        // debug("Inserting " + perkBatch.length + " participant perks");
        // await Promise.all([perkBatch.map(request)]);
        // debug("perkBatch Insert Done");
    } catch (err) {
        debug(err);
    }
};

/**
 * Gets a matchlist from RIOT based on the options passed. Uses the summoner's lastUpdated and
 * revisionDate if no options are passed.
 * @param {Object} summoner Summoner to get matches for
 * @param {IMatchOptions} options Object with beginTime and endTime to specify the dates to find matches
 * @return {Object} MatchList object from RIOT API
 */
const getMatchList = async (summoner, options: IMatchOptions) => {
    debug("Getting match list");
    if (!util.isObject(summoner)) {
        try {
            summoner = JSON.parse(summoner);
        } catch (e) {
            debug("Unable to parse summoner");
            debug(e);
            return;
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

    debug("Using these dates:");
    debug(new Date(options.beginTime));
    debug(new Date(options.endTime));

    let riotMatchList = null;
    try {
        // Send request to RIOT API
        riotMatchList = await Kayn.MatchlistV4.by.accountID(summoner.accountId).query(options);
    } catch (err) {
        if (err.statusCode === 404) {
            // This just means they don't have any matches during the time period
            // so return the options and a null list
            debug("No matches found");
            riotMatchList = null;
        } else if (err.statusCode === 400) {
            debug("Bad dates");
        } else {
            debug("Problem calling Kayn");
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
 * @param {number} beginTime UNIX milliseconds representing the last time the Summoner was updated
 * @param {number} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
 * @return {Promise<IMatchOptions>} JSON object containing beginTime and endTime to be used with a match method
 */
const getMatchDates = async (beginTime: number, endTime: number): Promise<IMatchOptions> => {
    let dates: IMatchOptions;
    if (util.isNullOrUndefined(beginTime)) {
        let dbSeason = await request({uri: serverURLs.Season.getWhere("{\"isCurrent\":1}")});
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
    debug("Transforming perticipant dependants");
    await Promise.all(matches.map(async (match) => {
        const dbParticipants = await request({
            json: true,
            method: "GET",
            uri: serverURLs.Participant.getWhere("{\"gameId\": " + match.gameId + "}"),
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
                    if (error.toString().indexOf("Cannot convert undefined")) {
                        return;
                    } else {
                        throw error;
                    }
                }

                timelineKeys.forEach((increment) => {
                    const value = dataParticipant.timeline[deltaType.name][increment];
                    timelineDeltaBatch.push({
                        body: {
                            deltaTypeId: deltaType.id,
                            increment,
                            participantId: dbParticipant.id,
                            value,
                        },
                        json: true,
                        method: "POST",
                        uri: serverURLs.ParticipantTimelineDelta.post(),
                    });
                });
            });

            statBatch.push({
                body: {
                    altarsCaptured: dataParticipant.stats.altarsCaptured || 0,
                    altarsNeutralized: dataParticipant.stats.altarsNeutralized || 0,
                    assists: dataParticipant.stats.assists,
                    champLevel: dataParticipant.stats.champLevel,
                    combatPlayerScore: dataParticipant.stats.combatPlayerScore,
                    damageDealtToObjectives: dataParticipant.stats.damageDealtToObjectives,
                    damageDealtToTurrets: dataParticipant.stats.damageDealtToTurrets,
                    deaths: dataParticipant.stats.deaths,
                    doubleKills: dataParticipant.stats.doubleKills,
                    firstBloodAssist: dataParticipant.stats.firstBloodAssist || false,
                    firstBloodKill: dataParticipant.stats.firstBloodKill || false,
                    firstInhibitorAssist: dataParticipant.stats.firstInhibitorAssist || false,
                    firstInhibitorKill: dataParticipant.stats.firstInhibitorKill || false,
                    firstTowerAssist: dataParticipant.stats.firstTowerAssist || false,
                    firstTowerKill: dataParticipant.stats.firstTowerKill || false,
                    goldEarned: dataParticipant.stats.goldEarned,
                    goldSpent: dataParticipant.stats.goldSpent || 0,
                    inhibitorKills: dataParticipant.stats.inhibitorKills,
                    killingSprees: dataParticipant.stats.killingSprees,
                    kills: dataParticipant.stats.kills,
                    largestCriticalStrike: dataParticipant.stats.largestCriticalStrike,
                    largestKillingSpree: dataParticipant.stats.largestKillingSpree,
                    largestMultiKill: dataParticipant.stats.largestMultiKill,
                    longestTimeSpentLiving: dataParticipant.stats.longestTimeSpentLiving,
                    magicDamageDealt: dataParticipant.stats.magicDamageDealt,
                    magicDamageDealtToChampions: dataParticipant.stats.magicDamageDealtToChampions,
                    magicalDamageTaken: dataParticipant.stats.magicalDamageTaken,
                    neutralMinionsKilled: dataParticipant.stats.neutralMinionsKilled,
                    // These could be undefined if neutralMinions is 0
                    neutralMinionsKilledEnemyJungle: dataParticipant.stats.neutralMinionsKilledEnemyJungle || 0,
                    neutralMinionsKilledTeamJungle: dataParticipant.stats.neutralMinionsKilledTeamJungle || 0,
                    nodeCapture: dataParticipant.stats.nodeCapture || 0,
                    nodeCaptureAssist: dataParticipant.stats.nodeCaptureAssist || 0,
                    nodeNeutralize: dataParticipant.stats.nodeNeutralize || 0,
                    nodeNeutralizeAssist: dataParticipant.stats.nodeNeutralizeAssists || 0,
                    objectivePlayerScore: dataParticipant.stats.objectivePlayerScore,
                    participantId: dbParticipant.id,
                    pentaKills: dataParticipant.stats.pentaKills,
                    perkPrimaryStyle: dataParticipant.stats.perkPrimaryStyle,
                    perkSubStyle: dataParticipant.stats.perkSubStyle,
                    physicalDamageDealt: dataParticipant.stats.physicalDamageDealt,
                    physicalDamageDealtToChampions: dataParticipant.stats.physicalDamageDealtToChampions,
                    physicalDamageTaken: dataParticipant.stats.physicalDamageTaken,
                    quadraKills: dataParticipant.stats.quadraKills,
                    sightWardsBoughtInGame: dataParticipant.stats.sightWardsBoughtInGame,
                    teamObjective: dataParticipant.stats.teamObjective || 0,
                    timeCCingOthers: dataParticipant.stats.timeCCingOthers,
                    totalDamageDealt: dataParticipant.stats.totalDamageDealt,
                    totalDamageDealtToChampions: dataParticipant.stats.totalDamageDealtToChampions,
                    totalDamageTaken: dataParticipant.stats.totalDamageTaken,
                    totalHeal: dataParticipant.stats.totalHeal,
                    totalMinionsKilled: dataParticipant.stats.totalMinionsKilled,
                    totalPlayerScore: dataParticipant.stats.totalPlayerScore,
                    totalScoreRank: dataParticipant.stats.totalScoreRank,
                    totalTimeCrowdControlDealt: dataParticipant.stats.totalTimeCrowdControlDealt,
                    totalUnitsHealed: dataParticipant.stats.totalUnitsHealed,
                    tripleKills: dataParticipant.stats.tripleKills,
                    trueDamageDealt: dataParticipant.stats.trueDamageDealt,
                    trueDamageDealtToChampions: dataParticipant.stats.trueDamageDealtToChampions,
                    trueDamageTaken: dataParticipant.stats.trueDamageTaken,
                    turretKills: dataParticipant.stats.turretKills,
                    unrealKills: dataParticipant.stats.unrealKills,
                    visionScore: dataParticipant.stats.visionScore,
                    visionWardsBoughtInGame: dataParticipant.stats.visionWardsBoughtInGame,
                    wardsKilled: dataParticipant.stats.wardsKilled || 0,
                    wardsPlaced: dataParticipant.stats.wardsPlaced || 0,
                    win: dataParticipant.stats.win,
                },
                json: true,
                method: "POST",
                uri: serverURLs.ParticipantStat.post(),
            });

            let itemCount = 0;
            while (!util.isNullOrUndefined(dataParticipant.stats["item" + itemCount])) {
                itemBatch.push({
                    body: {
                        itemId: dataParticipant.stats["item" + itemCount],
                        participantId: dbParticipant.id,
                    },
                    json: true,
                    method: "POST",
                    uri: serverURLs.XrefParticipantItem.post(),
                });

                itemCount = itemCount + 1;
            }

            let perkCount = 0;
            while (!util.isNullOrUndefined(dataParticipant.stats["perk" + perkCount])) {
                let perkVarCount = 1;

                while (!util.isNullOrUndefined(dataParticipant.stats["perk" + perkCount + "Var" + perkVarCount])) {
                    perkBatch.push({
                        body: {
                            participantId: dbParticipant.id,
                            perkId: dataParticipant.stats["perk" + perkCount].toString(),
                            value: dataParticipant.stats["perk" + perkCount + "Var" + perkVarCount],
                            varId: perkVarCount,
                        },
                        json: true,
                        method: "POST",
                        uri: serverURLs.XrefParticipantPerk.post(),
                    });
                    perkVarCount = perkVarCount + 1;
                }
                perkCount = perkCount + 1;
                perkVarCount = 1;
            }
        });
    }));
    debug("Transformation done");
};

export function registerWorkers(worker) {
    worker.registerWorker("updateMatchList", async (task) => {
        debug("Update Match List:", JSON.parse(task.payload).name);
        const result = await updateMatchList(task.payload);
        task.end(result);
    });

    debug("Workers registered");
}

interface IMatchOptions {
    beginTime?: number;
    endTime?: number;
}
