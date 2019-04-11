import { post, requestBody } from '@loopback/rest';

// 3rd party imports
import * as util from "util";

// my imports
import { MatchV4MatchDto, MatchV4MatchlistDto, MatchV4MatchReferenceDto } from "kayn/typings/dtos";
import { kayn, request } from "../../util/common";
import {IDBDeltaTypes, IDBMatch, IDBMatchList, IDBParticipant,
    IDBParticipantStats, IDBParticipantTimelineDelta, IDBTeamBan, IDBTeamStat,
    IDBXrefParticipantItem, IDBXrefParticipantPerk, IMatchOptions} from "../../util/interfaces";
import * as WebServer from "../../util/web-server";
import { Summoner } from '../models';

// globals
// tslint:disable-next-line:no-var-requires
const debug = require("debug")("lolpa:MatchData*");
const serverURLs = new WebServer.URLs();
let matchlist: MatchV4MatchReferenceDto[] = [];

export class MatchDataController {
    constructor() { }

    @post('/MatchData', {
        responses: {
            '204': {
                description: 'Match data update has been queued',
            },
            '422': {
                description: 'Unable to validate summoner',
            }
        },
    })
    async updateMatchList(@requestBody() summoner: Summoner): Promise<void> {
        matchlist = await this.getMatchList(summoner, {});

        if (!matchlist) {
            debug("No matchList");
            return;
        }

        debug("Gathered " + matchlist.length + " matches");

        // Filter out the ones we already have
        const existingMatches = await request({
            json: true,
            method: "GET",
            uri: serverURLs.Match.get(),
        });
        matchlist = matchlist.filter(
            (ml: MatchV4MatchReferenceDto) => existingMatches.findIndex((e: IDBMatch) => e.gameId === ml.gameId) === -1);

        if (util.isNullOrUndefined(matchlist[0])) {
            debug("All matches already exist");
            return;
        }

        const deltaTypes: IDBDeltaTypes[] = JSON.parse(await request({ uri: serverURLs.DeltaType.getAll() }));
        const matchInsertBatch: IDBMatch[] = [];
        const matchListBatch: IDBMatchList[] = [];
        const participantBatch: IDBParticipant[] = [];
        const teamStatBatch: IDBTeamStat[] = [];
        const teamBanBatch: IDBTeamBan[] = [];
        const statBatch: IDBParticipantStats[] = [];
        const timelineDeltaBatch: IDBParticipantTimelineDelta[] = [];
        const itemBatch: IDBXrefParticipantItem[] = [];
        const perkBatch: IDBXrefParticipantPerk[] = [];

        debug("Getting matches from Riot API");
        const matches: MatchV4MatchDto[] = await Promise.all(matchlist.map(
            async (match: MatchV4MatchReferenceDto) => {
                matchListBatch.push({
                    championId: match.champion,
                    gameId: match.gameId,
                    lane: match.lane,
                    role: match.role,
                    summonerPUUID: summoner.puuid,
                    timestamp: new Date(match.timestamp),
                });
                return kayn.Match.get(match.gameId);
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

            await this.transformParticipantDependants(matches, deltaTypes,
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
                    uri: serverURLs.XrefParticipantItem.batch(),
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
    }

    /**
     * Gets a matchlist from RIOT based on the options passed. Uses the summoner's lastUpdated and
     * revisionDate if no options are passed.
     * @param {Summoner} summoner Summoner to get matches for
     * @param {IMatchOptions} options Object with beginTime and endTime to specify the dates to find matches
     * @return {MatchV4MatchReferenceDto[]} MatchList object from RIOT API
     */
    async getMatchList(summoner: Summoner, options: IMatchOptions): Promise<MatchV4MatchReferenceDto[]> {
        debug("Getting match list");

        if (util.isNullOrUndefined(options)) {
            options = {
                beginTime: null,
                endTime: null,
            };
        }

        // Determine the dates to pull
        options = await this.getMatchDates(options.beginTime || parseInt(summoner.lastUpdated),
            options.endTime || parseInt(summoner.revisionDate));

        debug("Using these dates:");
        debug(new Date(options.beginTime));
        debug(new Date(options.endTime));

        let riotMatchList: MatchV4MatchlistDto = null;
        try {
            // Send request to RIOT API
            if (options.beginTime < new Date().getTime()) {
                riotMatchList = await kayn.Matchlist.by.accountID(summoner.accountId).query(options);
            } else {
                throw { statusCode: 404 };
            }
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
                throw err;
            }
        }

        // Determine if we can stop the recursive loop
        if (options.beginTime < new Date(summoner.revisionDate).getTime()) {
            // We are not done yet
            if (!util.isNullOrUndefined(riotMatchList)) {
                Array.prototype.push.apply(matchlist, riotMatchList.matches);
            }

            // Call the recursive function, but with update options and the match list attached to the summoner
            return this.getMatchList(summoner, {
                beginTime: options.endTime,
                endTime: options.endTime + 604800000, // Add a week, the max allowed time by RIOT API
            });
        } else {
            // We're done. Finish the loop.
            return;
        }
    }

    /**
     * @param {number} beginTime UNIX milliseconds representing the last time the Summoner was updated
     * @param {number} endTime UNIX milliseconds representing the last time the Summoner was updated according to RIOT
     * @return {Promise<IMatchOptions>} JSON object containing beginTime and endTime to be used with a match method
     */
    async getMatchDates(beginTime: number, endTime: number): Promise<IMatchOptions> {
        let dates: IMatchOptions;
        if (util.isNullOrUndefined(beginTime)) {
            let dbSeason = await request({ uri: serverURLs.Season.getWhere("{\"isCurrent\":1}") });
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
    }

    /**
     * Iterate over matches again to load deltas. Need Participants loaded first so that we can get their IDs.
     * @param {MatchV4MatchDto[]} matches
     * @param {IDBDeltaTypes[]} deltaTypes
     * @param {IDBParticipantTimelineDelta[]} timelineDeltaBatch
     * @param {IDBParticipantStats[]} statBatch
     * @param {IDBXrefParticipantItem[]} itemBatch
     * @param {IDBXrefParticipantPerk[]} perkBatch
     */
    async transformParticipantDependants(matches: MatchV4MatchDto[], deltaTypes: IDBDeltaTypes[],
        timelineDeltaBatch: IDBParticipantTimelineDelta[],
        statBatch: IDBParticipantStats[], itemBatch: IDBXrefParticipantItem[],
        perkBatch: IDBXrefParticipantPerk[]) {
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

                    timelineKeys.forEach((increment: string) => {
                        timelineDeltaBatch.push({
                            deltaTypeId: deltaType.id,
                            increment,
                            participantId: dbParticipant.id,
                            value: parseFloat(dataParticipant.timeline[deltaType.name][increment].toFixed(2)),
                        });
                    });
                });

                statBatch.push({
                    altarsCaptured: dataParticipant.stats.altarsCaptured || 0,
                    altarsNeutralized: dataParticipant.stats.altarsNeutralized || 0,
                    assists: dataParticipant.stats.assists,
                    champLevel: dataParticipant.stats.champLevel,
                    combatPlayerScore: dataParticipant.stats.combatPlayerScore,
                    damageDealtToObjectives: dataParticipant.stats.damageDealtToObjectives,
                    damageDealtToTurrets: dataParticipant.stats.damageDealtToTurrets,
                    damageSelfMitigated: dataParticipant.stats.damageSelfMitigated,
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
                    nodeNeutralizeAssist: dataParticipant.stats.nodeNeutralizeAssist || 0,
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
                    statPerk0: dataParticipant.stats.statPerk0,
                    statPerk1: dataParticipant.stats.statPerk1,
                    statPerk2: dataParticipant.stats.statPerk2,
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
                });

                let itemCount = 0;
                while (!util.isNullOrUndefined(dataParticipant.stats["item" + itemCount])) {
                    itemBatch.push({
                        itemId: dataParticipant.stats["item" + itemCount],
                        participantId: dbParticipant.id,
                    });

                    itemCount = itemCount + 1;
                }

                let perkCount = 0;
                while (!util.isNullOrUndefined(dataParticipant.stats["perk" + perkCount])) {
                    let perkVarCount = 1;

                    while (!util.isNullOrUndefined(dataParticipant.stats["perk" + perkCount + "Var" + perkVarCount])) {
                        perkBatch.push({
                            participantId: dbParticipant.id,
                            perkId: dataParticipant.stats["perk" + perkCount].toString(),
                            value: dataParticipant.stats["perk" + perkCount + "Var" + perkVarCount],
                            varId: perkVarCount,
                        });
                        perkVarCount = perkVarCount + 1;
                    }
                    perkCount = perkCount + 1;
                    perkVarCount = 1;
                }
            });
        }))
        debug("Transformation done");
    }
}
