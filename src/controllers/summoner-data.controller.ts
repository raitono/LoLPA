// my imports
import { SummonerV4SummonerDTO } from "kayn/typings/dtos";
import { kayn, request } from "../../util/common";
import { IDBSummoner } from "../../util/interfaces";
import * as WebServer from "../../util/web-server";
import { Summoner } from "../models";
import { get, put, param, requestBody } from "@loopback/rest";

// globals
// tslint:disable-next-line:no-var-requires
const debug = require("debug")("lolpa:SummonerData*");
const serverURLs = new WebServer.URLs();

export class SummonerDataController {
    constructor() { }

    /**
     * Determine which updates to perform on a Summoner. Currently only detect matches.
     * @param {string} summoner JSON representation of the Summoner to update
     * @return {Promise<{matches: boolean; summoner: boolean;}>}
     */
    @get('/SummonerData/updates', {
        responses: {
            '200': {
                description: 'Summoner updates',
            },
        },
    })
    async updates(summoner: Summoner): Promise<{ matches: boolean; summoner: boolean; }> {
        let updates = {
            matches: false,
            summoner: false,
        };

        if (summoner.lastUpdated === null || summoner.lastUpdated === undefined) {
            updates.matches = true;
        } else if (Date.now() - Date.parse(summoner.lastUpdated) >= 600000) {
            updates.matches = true;
            updates.summoner = true;
        }

        return updates;
    }

    /**
     * Retrieve a summoner from the database.
     * If the summoner cannot be found, retrieves it from RIOT and inserts it.
     * @param {string} name Summoner name to update
     * @return {Promise<IDBSummoner>} The summoner stored in the database
     */
    @get('/SummonerData/{name}', {
        responses: {
            '200': {
                description: 'Summoner',
                content: { 'application/json': { schema: {'x-ts-type': Summoner} } },
            },
        },
    })
    async getSummonerByName(name: string): Promise<IDBSummoner> {
        const summonerDBRequestOptions = {
            json: true,
            method: "GET",
            uri: serverURLs.Summoner.getByName(name),
        };

        let summonerSearchResults: IDBSummoner[] = await request(summonerDBRequestOptions);
        let summoner: IDBSummoner = summonerSearchResults[0];

        if (summoner) {
            debug("Retrieved Summoner");
        } else {
            debug("Summoner not found in db");
            try {
                const rawSummoner: SummonerV4SummonerDTO = await kayn.Summoner.by.name(name);
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
                    debug("Summoner does not exist: " + name);
                }
                debug("Kayn Error:" + kaynError);
            }
        }

        return summoner;
    }

    /**
     * Updates the Summoner's lastUpdated field to now
     * @param {Summoner} summoner
     */
    @put('/SummonerData/{accountId}')
    async updateLastUpdated(
        @param.path.number('accountId') accountId: number,
        @requestBody() summoner: Summoner,
    ): Promise<void> {
        request({
            body: {
                accountId: accountId,
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
    }
}
