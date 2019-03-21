// my imports
import { SummonerV4SummonerDTO } from "kayn/typings/dtos";
import { kayn, request } from "../../../util/common";
import { IDBSummoner } from "../../../util/interfaces";
import * as WebServer from "../../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Summoner*");
const serverURLs = new WebServer.URLs();

/**
 * Determine which updates to perform on a Summoner. Currently only detect matches.
 * @param {string} summoner JSON representation of the Summoner to update
 * @return {Promise<string>}
 *                     Object.summoner - JSON string representation of the summoner
 *                     Object.shouldUpdateMatches - Boolean
 */
const determineUpdates = async (summoner: string): Promise<string> => {
    let ret = {
        shouldUpdateMatches: false,
        summoner: JSON.parse(summoner),
    };

    if (ret.summoner.lastUpdated === null || ret.summoner.lastUpdated === undefined) {
        ret.shouldUpdateMatches = true;
        return JSON.stringify(ret);
    } else if (Date.now() - Date.parse(ret.summoner.lastUpdated) >= 600000) {
        const rawSummoner: SummonerV4SummonerDTO = await kayn.Summoner.by.name(ret.summoner.name);
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
 * @return {Promise<string>} JSON string representing the summoner stored in the database
 */
const getSummonerByName = async (summonerName: string): Promise<string> => {
    const summonerDBRequestOptions = {
        json: true,
        method: "GET",
        uri: serverURLs.Summoner.getByName(summonerName),
    };

    let summonerSearchResults: IDBSummoner[] = await request(summonerDBRequestOptions);
    let summoner: IDBSummoner = summonerSearchResults[0];

    if (summoner) {
        debug("Retrieved Summoner");
    } else {
        debug("Summoner not found in db");
        try {
            const rawSummoner: SummonerV4SummonerDTO = await kayn.Summoner.by.name(summonerName);
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

            summonerSearchResults = await request(summonerDBRequestOptions);
            summoner = summonerSearchResults[0];
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
 * @param {string} summonerJSON Json representation of a Summoner
 */
const updateLastUpdated = async (summonerJSON: string) => {
    const summoner: IDBSummoner = JSON.parse(summonerJSON);
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
