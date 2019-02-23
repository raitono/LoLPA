// 3rd party imports
import requestPromiseNative = require("request-promise-native");
import Kayn = require("../kayn");

// my imports
import { readFileAsync, request } from "../util/common";
import * as WebServer from "../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Summoner");
const serverURLs = new WebServer.URLs();

/**
 * Determine which updates to perform on a Summoner. Currently only detect matches.
 * @param {string} summoner JSON representation of the Summoner to update
 * @return {Object} Object.summoner - JSON string representation of the summoner
 * 					 Object.shouldUpdateMatches - Boolean
 */
const determineUpdates = async (summoner) => {
    let ret = {
        shouldUpdateMatches: false,
        summoner: JSON.parse(summoner),
    };

    if (ret.summoner.lastUpdated === null || ret.summoner.lastUpdated === undefined) {
        ret.shouldUpdateMatches = true;
        return JSON.stringify(ret);
    } else if (Date.now() - Date.parse(ret.summoner.lastUpdated) >= 600000) {
        const rawSummoner = await Kayn.SummonerV4.by.name(ret.summoner.name);
        if ((rawSummoner.revisionDate - Date.parse(ret.summoner.revisionDate)) !== 0) {
            await request({
                body: {
                    accountId: rawSummoner.accountId,
                    lastUpdated: new Date(ret.summoner.lastUpdated),
                    name: rawSummoner.name,
                    profileIconId: rawSummoner.profileIconId,
                    puuid: rawSummoner.puuid,
                    revisionDate: new Date(rawSummoner.revisionDate),
                    summonerId: rawSummoner.id,
                    summonerLevel: rawSummoner.summonerLevel,
                },
                json: true,
                method: "PUT",
                uri: serverURLs.Summoner.put(rawSummoner.puuid),
            });

            ret = {
                shouldUpdateMatches: true,
                summoner: await request({
                    json: true,
                    method: "GET",
                    uri: serverURLs.Summoner.get(rawSummoner.puuid),
                }),
            };
        }
    }

    return JSON.stringify(ret);
};

/**
 * Retrieve a summoner from the database.
 * If the summoner cannot be found, retrieves it from RIOT and inserts it.
 * @param {string} summonerName Summoner name to update
 * @return {string} JSON string representing the summoner stored in the database
 */
const getSummonerByName = async (summonerName) => {
    let summoner = "";
    const summonerDBRequestOptions = {
        json: true,
        method: "GET",
        uri: serverURLs.Summoner.getByName(summonerName),
    };

    summoner = await request(summonerDBRequestOptions);
    summoner = summoner[0];

    if (summoner) {
        debug("Retrieved Summoner");
    } else {
        debug("Summoner not found in db");
        try {
            const rawSummoner = await Kayn.SummonerV4.by.name(summonerName);
            await request({
                body: {
                    accountId: rawSummoner.accountId,
                    name: rawSummoner.name,
                    profileIconId: rawSummoner.profileIconId,
                    puuid: rawSummoner.puuid,
                    revisionDate: new Date(rawSummoner.revisionDate),
                    summonerId: rawSummoner.id,
                    summonerLevel: rawSummoner.summonerLevel,
                },
                json: true,
                method: "POST",
                uri: serverURLs.Summoner.post(),
            });

            debug(rawSummoner.name + " inserted");

            summoner = await request(summonerDBRequestOptions);
            summoner = summoner[0];
        } catch (kaynError) {
            if (kaynError.statusCode === 404) {
                debug("Summoner does not exist: " + summonerName);
            }
            debug("Kayn Error:" + kaynError);
        }
    }

    return JSON.stringify(summoner);
};

/**
 * Updates the Summoner's lastUpdated field to now
 * @param {string} summoner Json representation of a Summoner
 */
const updateLastUpdated = async (summoner) => {
    summoner = JSON.parse(summoner);
    request({
        body: {
            accountId: summoner.accountId,
            lastUpdated: new Date(Date.now()),
            name: summoner.name,
            profileIconId: summoner.profileIconId,
            puuid: summoner.puuid,
            revisionDate: new Date(summoner.revisionDate),
            summonerId: summoner.summonerId,
            summonerLevel: summoner.summonerLevel,
        },
        json: true,
        method: "PUT",
        uri: serverURLs.Summoner.put(summoner.puuid),
    });
};

export function registerWorkers(worker) {
    worker.registerWorker("determineUpdates", async (task) => {
        const s = await determineUpdates(task.payload);
        task.end(s);
    });

    worker.registerWorker("getSummonerByName", async (task) => {
        debug("getSummonerByName: " + task.payload);
        const s = await getSummonerByName(task.payload);
        task.end(s);
    });

    worker.registerWorker("updateSummonerLastUpdated", async (task) => {
        debug("update lastUpdated");
        const s = await updateLastUpdated(task.payload);
        task.end(s);
    });

    debug("Workers registered");
}
