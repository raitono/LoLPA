// 3rd party imports
import requestPromiseNative = require("request-promise-native");
import * as util from "util";

// my imports
import { MatchV4MatchDto } from "kayn/typings/dtos";
import { batchRequest, kayn, request } from "../util/common";
import { IAPIMatchList, IDBItem, IDBMatch, IDBMatchList, IDBParticipant, IDBParticipantStats,
    IDBParticipantTimelineDelta, IDBTeamBan, IDBTeamStat, IDBXrefParticipantPerk } from "../util/interfaces";
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

    // Filter out the ones we already have
    const existingMatches = await request({
        json: true,
        method: "GET",
        uri: serverURLs.Match.get(),
    });
    summoner.matchList = summoner.matchList.filter(
        (ml: IAPIMatchList) => existingMatches.findIndex((e: IDBMatch) => e.gameId === ml.gameId) === -1);

    if (util.isNullOrUndefined(summoner.matchList[0])) {
        debug("All matches already exist");
        return;
    }

    const deltaTypes = JSON.parse(await request({uri: serverURLs.DeltaType.getAll()}));
    const matchInsertBatch: IDBMatch[] = [];
    const matchListBatch: IDBMatchList[] = [];
    const participantBatch: IDBParticipant[] = [];
    const teamStatBatch: IDBTeamStat[] = [];
    const teamBanBatch: IDBTeamBan[] = [];
    const statBatch: IDBParticipantStats[] = [];
    const timelineDeltaBatch: IDBParticipantTimelineDelta[] = [];
    const itemBatch: IDBItem[] = [];
    const perkBatch: IDBXrefParticipantPerk[] = [];

    debug("Getting matches from Riot API");
    const matches: MatchV4MatchDto[] = await Promise.all(summoner.matchList.map(
        async (matchList: IAPIMatchList) => {
            matchListBatch.push({
                championId: matchList.champion,
                gameId: matchList.gameId,
                lane: matchList.lane,
                role: matchList.role,
                summonerPUUID: summoner.puuid,
                timestamp: new Date(matchList.timestamp),
            });
            return kayn.MatchV4.get(matchList.gameId);
        }));
    debug("Retrieved matches");

    // Batch up the insert options
    matches.forEach((match) => {
        matchInsertBatch.push({
            gameCreation: new Date(match.gameCreation),
            gameDuration: match.gameDuration,
            gameId: match.gameId,
            gameMode: match.gameMode,
            gameType: match.gameType,
            gameVersion: match.gameVersion,
            mapId: match.mapId,
            platformId: match.platformId,
            queueId: match.queueId,
            seasonId: match.seasonId,
        });

        match.teams.forEach((team) => {
            teamStatBatch.push({
                baronKills: team.baronKills,
                dominionVictoryScore: team.dominionVictoryScore,
                dragonKills: team.dragonKills,
                firstBlood: team.firstBlood,
                firstDragon: team.firstDragon,
                firstInhibitor: team.firstInhibitor,
                firstRiftHerald: team.firstRiftHerald,
                firstTower: team.firstTower,
                gameId: match.gameId,
                inhibitorKills: team.inhibitorKills,
                riftHeraldKills: team.riftHeraldKills,
                teamId: team.teamId,
                towerKills: team.towerKills,
                vilemawKills: team.vilemawKills,
                win: team.win,
            });

            team.bans.forEach((ban) => {
                teamBanBatch.push({
                    championId: ban.championId,
                    gameId: match.gameId,
                    pickTurn: ban.pickTurn,
                    teamId: team.teamId,
                });
            });
        });

        match.participants.forEach((participant) => {
            participantBatch.push({
                accountId: match.participantIdentities.filter(
                    (i) => i.participantId === participant.participantId)[0].player.accountId,
                championId: participant.championId,
                gameId: match.gameId,
                highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
                lane: participant.timeline.lane,
                participantId: participant.participantId,
                role: participant.timeline.role,
                spell1Id: participant.spell1Id,
                spell2Id: participant.spell2Id,
                teamId: participant.teamId,
            });
        });
    });

    try {
        // This has to be done separate because of the foreign keys.
        await request({
            body: matchInsertBatch,
            json: true,
            method: "POST",
            uri: serverURLs.Match.batch(),
        });
        await Promise.all([
            request({
                body: matchListBatch,
                json: true,
                method: "POST",
                uri: serverURLs.MatchList.batch(),
            }),
            request({
                body: participantBatch,
                json: true,
                method: "POST",
                uri: serverURLs.Participant.batch(),
            }),
        ]);

        await transformParticipantDependants(matches, deltaTypes,
            timelineDeltaBatch, statBatch, itemBatch, perkBatch);

        await Promise.all([
            request({
                body: timelineDeltaBatch,
                json: true,
                method: "POST",
                uri: serverURLs.ParticipantTimelineDelta.batch(),
            }),
            request({
                body: teamStatBatch,
                json: true,
                method: "POST",
                uri: serverURLs.TeamStat.batch(),
            }),
            request({
                body: teamBanBatch,
                json: true,
                method: "POST",
                uri: serverURLs.TeamBan.batch(),
            }),
            request({
                body: statBatch,
                json: true,
                method: "POST",
                uri: serverURLs.ParticipantStat.batch(),
            }),
            request({
                body: itemBatch,
                json: true,
                method: "POST",
                uri: serverURLs.Item.batch(),
            }),
            request({
                body: perkBatch,
                json: true,
                method: "POST",
                uri: serverURLs.XrefParticipantPerk.batch(),
            }),
        ]);
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
        riotMatchList = await kayn.MatchlistV4.by.accountID(summoner.accountId).query(options);
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
 * @param {IDBParticipantTimelineDelta[]} timelineDeltaBatch
 * @param {requestPromiseNative.OptionsWithUri[]} statBatch
 * @param {requestPromiseNative.OptionsWithUri[]} itemBatch
 * @param {requestPromiseNative.OptionsWithUri[]} perkBatch
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
                    timelineDeltaBatch.push({
                        deltaTypeId: deltaType.id,
                        increment,
                        participantId: dbParticipant.id,
                        value: parseFloat(dataParticipant.timeline[deltaType.name][increment].toFixed(2)),
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
