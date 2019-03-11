// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import { ISummonerSpell, ISummonerSpellFileWrapper } from "../../util/interfaces";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:SummonerSpell*");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Summoner Spell data
 */
export async function parse(filePath: string): Promise<void> {
    const summonerSpellBatch: requestPromiseNative.OptionsWithUri[] = [];
    const spellDataFile: Buffer = await readFileAsync(filePath);
    const spellDataWrapper: ISummonerSpellFileWrapper = JSON.parse(spellDataFile.toString());
    const spellData: ISummonerSpell[] = Object.keys(spellDataWrapper.data).map(
        (index) => spellDataWrapper.data[index] as ISummonerSpell);

    spellData.forEach((s) => {
        summonerSpellBatch.push({
            body: {
                key: s.id,
                name: s.name,
                spellId: parseInt(s.key),
            },
            json: true,
            method: "PUT",
            uri: serverURLs.SummonerSpell.put(s.key),
        });
    });
    Promise.all(summonerSpellBatch.map(request)).then(() => debug("Summoner Spells added"));
}
