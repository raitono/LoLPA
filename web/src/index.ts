// VS Code intellisense requires this. It compiles without it though.
/// <reference path="../types/abraxas.d.ts"/>

import {LoLPAApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import dotenv = require('dotenv-safe');
import * as Gearman from 'abraxas';
const debug: any = require("debug")("lolpa-web:app*");
import fs = require("fs");

import Summoner = require("./gearman/workers/Summoner");
import Match = require("./gearman/workers/Match");
import StaticData = require("./gearman/workers/StaticData");

export {LoLPAApplication};

export async function main(options: ApplicationConfig = {}) {
    dotenv.config();
    const app = new LoLPAApplication(options);
    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    
    const client = initGearman();

    // client.submitJob("updateStaticData", "9.5.1");

    const summonerName = "Raitono";

    let dbSummoner;
    try {
        dbSummoner = JSON.parse(await client.submitJob("getSummonerByName", summonerName));
    } catch (error) {
        debug("Unable to update summoner");
        debug(error);
    }

    const updateSummonerResult = JSON.parse(await client.submitJob("determineUpdates", JSON.stringify(dbSummoner)));
    debug("Updated summoner: " + summonerName);

    if (updateSummonerResult.shouldUpdateMatches) {
        try {
            await client.submitJob("updateMatchList", JSON.stringify(updateSummonerResult.summoner));
            debug("Updated match list for " + summonerName);
            client.submitJob("updateSummonerLastUpdated", JSON.stringify(updateSummonerResult.summoner));
        } catch (error) {
            debug(error);
        }
    }
    
    return app;
}

function initGearman() {
    Gearman.Server.listen({
        port: 4730,
    });
    debug("Gearman listening on port 4730");

    const client = Gearman.Client.connect({
        defaultEncoding: "utf8",
        servers: ["127.0.0.1:4730"],
    });

    const staticDataTempDir = "./temp";
    if (!fs.existsSync(staticDataTempDir)) {
        fs.mkdirSync(staticDataTempDir);
    }

    Summoner.registerWorkers(client);
    Match.registerWorkers(client);
    StaticData.registerWorkers(client);

    return client;
}
