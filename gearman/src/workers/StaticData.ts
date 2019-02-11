// 3rd party imports
import Kayn = require("../kayn");

// my imports
import RunesReforged = require("./parsers/RunesReforged");

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
    parseAndLoad(latestVersion);
};

const parseAndLoad = async (version: string) => {
    const tempFilePath = "./temp/" + version + "/data/en_US/";
    const batches = [];
    const championTags = [];

    return RunesReforged.parse(tempFilePath + "runesReforged.json");
};

export function registerWorkers(worker) {
    worker.registerWorker("updateStaticData", async (task) => {
        debug("Update Static Data");
        const result = await updateStaticData();
        task.end(result);
    });

    debug("Workers registered");
}
