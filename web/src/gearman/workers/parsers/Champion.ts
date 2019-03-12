// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../../../util/common";
import { IChampion, IChampionFileWrapper } from "../../../../util/interfaces";
import * as WebServer from "../../../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Champion*");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Champion data
 */
export async function parse(filePath: string): Promise<void> {
    const champDataFile: Buffer = await readFileAsync(filePath);
    const champDataWrapper: IChampionFileWrapper = JSON.parse(champDataFile.toString());
    const champData: IChampion[] = Object.keys(champDataWrapper.data).map(
        (index) => champDataWrapper.data[index] as IChampion);
    const championBatch: requestPromiseNative.OptionsWithUri[] = [];
    const championTagBatch: requestPromiseNative.OptionsWithUri[] = [];
    const championTags: Array<{championId: number; tags: string[]}> = [];
    const tags: string[] = [];

    // The spicy NONE ban
    championBatch.push({
        body: {
            armor: 0,
            armorperlevel: 0,
            attackdamage: 0,
            attackdamageperlevel: 0,
            attackrange: 0,
            attackspeed: 0,
            attackspeedperlevel: 0,
            championId: -1,
            crit: 0,
            critperlevel: 0,
            hp: 0,
            hpperlevel: 0,
            hpregen: 0,
            hpregenperlevel: 0,
            movespeed: 0,
            mp: 0,
            mpperlevel: 0,
            mpregen: 0,
            mpregenperlevel: 0,
            name: "None",
            partype: "None",
            spellblock: 0,
            spellblockperlevel: 0,
            title: "None",
            version: "None",
        },
        json: true,
        method: "PUT",
        uri: serverURLs.Champion.put(-1),
    });

    // The JSON stores them as properties on the data object, not as an array.
    // So .forEach directly on the champData doesn't work.
    champData.forEach((champ) => {
        const championId = parseInt(champ.key);
        championBatch.push({
            body: {
                armor: champ.stats.armor,
                armorperlevel: champ.stats.armorperlevel,
                attackdamage: champ.stats.attackdamage,
                attackdamageperlevel: champ.stats.attackdamageperlevel,
                attackrange: champ.stats.attackrange,
                attackspeed: champ.stats.attackspeed,
                attackspeedperlevel: champ.stats.attackspeedperlevel,
                championId,
                crit: champ.stats.crit,
                critperlevel: champ.stats.critperlevel,
                hp: champ.stats.hp,
                hpperlevel: champ.stats.hpperlevel,
                hpregen: champ.stats.hpregen,
                hpregenperlevel: champ.stats.hpregenperlevel,
                movespeed: champ.stats.movespeed,
                mp: champ.stats.mp,
                mpperlevel: champ.stats.mpperlevel,
                mpregen: champ.stats.mpregen,
                mpregenperlevel: champ.stats.mpregenperlevel,
                name: champ.name,
                partype: champ.partype,
                spellblock: champ.stats.spellblock,
                spellblockperlevel: champ.stats.spellblockperlevel,
                title: champ.title,
                version: champDataWrapper.version,
            },
            json: true,
            method: "PUT",
            uri: serverURLs.Champion.put(championId),
        });

        // Save tags
        championTags.push({championId, tags: champ.tags});

        // Toss tags all into one array
        champ.tags.forEach((tag: string) => {
            tags.push(tag);
        });
    });

    // We don't care about the return from this, so just start it and move on
    Promise.all(championBatch.map(request)).then(() => {
        debug("Champions done");
    });

    // Use the Set type to create a unique array of tags
    const uniqueTags = [...new Set(tags)];

    const existingTags: Array<{ id: number; name: string; }> = await request({
        json: true,
        method: "GET",
        uri: serverURLs.ChampionTag.getWhere("{\"name\": {\"inq\": " + JSON.stringify(uniqueTags) + "}}"),
    });

    // Only add tags that don't already exist
    uniqueTags.filter((t) => existingTags.findIndex((e) => e.name === t) === -1)
        .forEach((tag) => {
            championTagBatch.push({
                body: {
                    name: tag,
                },
                json: true,
                method: "POST",
                uri: serverURLs.ChampionTag.post(),
            });
        });

    // We do need the return from this one before we can move on
    await championTagBatch.map(request);
    debug("Champion tags done");

    // Efficiency!
    const tx = await Promise.all([
        request({
            json: true,
            method: "GET",
            uri: serverURLs.ChampionTag.get(),
        }),
        request({
            json: true,
            method: "GET",
            uri: serverURLs.XrefChampionTag.get(),
        }),
    ]);
    const dbTags = tx[0];
    const existingXrefs = tx[1];

    const tagXrefBatch = [];
    championTags.forEach((championTag) => {
        championTag.tags.forEach((cTag) => {
            const tagId = dbTags.filter((t) => t.name === cTag);
            // If a crossreference doesn't exist, create it
            if (tagId[0] && !existingXrefs.filter(
                (x) => x.championId === championTag.championId && x.tagId === tagId[0].id)[0]) {
                tagXrefBatch.push({
                    body: {
                        championId: championTag.championId,
                        tagId: tagId[0].id,
                    },
                    json: true,
                    method: "POST",
                    uri: serverURLs.XrefChampionTag.post(),
                });
            }
        });
    });

    // Don't need to await, just start it and let this bit exit since it is the last thing.
    Promise.all(tagXrefBatch.map(request)).then(() => {
        debug("Champion Tag Xref done");
    });
}
