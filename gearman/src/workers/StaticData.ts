// 3rd party imports
import del = require("del");
import * as fs from "fs";
import https = require("https");
import tar = require("tar");
import Kayn = require("../kayn");

// my imports
import Champion = require("./parsers/Champion");
import Item = require("./parsers/Item");
import RunesReforged = require("./parsers/RunesReforged");
import SummonerSpell = require("./parsers/SummonerSpell");

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:StaticData");
let latestVersion: string = "";
const staticTarballURL: string = "https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz";

/**
 * Retrieve the latest static data tarball from RIOT and upsert it into the database.
 */
const updateStaticData = async () => {
    // Find latest version number
    const versions = await Kayn.DDragon.Version.list();
    latestVersion = "9.1.1"; // versions[0];
    debug("Latest version: " + latestVersion);

    // Download and extract tarball to temp directory
    const tarballURL = staticTarballURL.replace("{version}", latestVersion);
    debug("terball link: " + tarballURL);

    const tempTarballPath = "./temp/" + latestVersion + ".tgz";
    const tarballPathRoot = "./" + latestVersion + "/data/en_US/";

    // For some reason, the Request package gives an Array Buffer error when trying to do this.
    // Guess we do it the old fashioned way.
    const file = fs.createWriteStream(tempTarballPath);
    https.get(tarballURL, (response) => {
        response.pipe(file);
        response.on("end", () => {
            debug("tarball saved");

            tar.extract({
                cwd: "./temp",
                file: tempTarballPath,
                gzip: true,
            },
            [
                tarballPathRoot + "champion.json",
                tarballPathRoot + "item.json",
                tarballPathRoot + "runesReforged.json",
                tarballPathRoot + "summoner.json",
            ],
            () => {
                debug("tarball extracted");
                parseAndLoad(latestVersion);
            },
            ).catch((err) => {
                debug("Oops");
                debug(err);
            });
        });
    });
};

const parseAndLoad = async (version: string) => {
    const tempFilePath = "./temp/" + version + "/data/en_US/";

    await Promise.all([
        Champion.parse(tempFilePath + "champion.json"),
        // Item.parse(tempFilePath + "item.json"),
        // RunesReforged.parse(tempFilePath + "runesReforged.json"),
        // SummonerSpell.parse(tempFilePath + "summoner.json"),
    ]);

    // Clean up
    // The glob pattern ** matches all children and the parent
    del(["./temp/" + version + ".tgz", "./temp/" + version + "/**"])
    .then(() => {
        debug("Clean up done");
    }).catch((err) => {
        debug(err);
    });
};

export function registerWorkers(worker) {
    worker.registerWorker("updateStaticData", async (task) => {
        debug("Update Static Data");
        const result = await updateStaticData();
        task.end(result);
    });

    debug("Workers registered");
}
