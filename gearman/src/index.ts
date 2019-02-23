import app from "./App";

// tslint:disable-next-line:no-var-requires
const debug = require("debug")("lolpa-gearman:app");
import fs = require("fs");

import Gearman = require("abraxas");
// const Match = require("../src/workers/Match");
import StaticData = require("./workers/StaticData");
import Summoner = require("./workers/Summoner");

const staticDataTempDir = "./temp";
let client;
const port = process.env.PORT || 8080;

app.listen(port, () => {
    Gearman.Server.listen({
        port: 4730,
    });
    debug("Gearman listening on port 4730");

    client = Gearman.Client.connect({
        defaultEncoding: "utf8",
        servers: ["127.0.0.1:4730"],
    });

    if (!fs.existsSync(staticDataTempDir)) {
        fs.mkdirSync(staticDataTempDir);
    }

    Summoner.registerWorkers(client);
    // Match.registerWorkers(client);
    StaticData.registerWorkers(client);

    run();
});

const run = async () => {
    // await client.submitJob("updateStaticData", "ThisIsNecessaryButNotUsed");
    // debug("updateStaticData queued");
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
    debug(updateSummonerResult);

    // if (updateSummonerResult.shouldUpdateMatches) {
    //     try {
    //         await client.submitJob("updateMatchList", JSON.stringify(updateSummonerResult.summoner));
    //         debug("Updated match list for " + summonerName);
    //         client.submitJob("updateSummonerLastUpdated", JSON.stringify(updateSummonerResult.summoner));
    //     } catch (error) {
    //         debug(error);
    //     }
    // }
};
