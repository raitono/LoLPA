// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:RunesReforged");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Runes Reforged data
 */
export async function parse(filePath: string): Promise<void> {
    const runeStyleBatch: requestPromiseNative.OptionsWithUri[] = [];
    const runeBatch: requestPromiseNative.OptionsWithUri[] = [];
    const runeDataFile: Buffer = await readFileAsync(filePath);
    const runeData: IRuneStyle[] = JSON.parse(runeDataFile.toString());

    runeData.forEach((runeStyle) => {
        runeStyleBatch.push({
            body: {
                name: runeStyle.name,
                styleId: runeStyle.id.toString(),
            },
            json: true,
            method: "PUT",
            uri: serverURLs.Rune.put_style(runeStyle.id.toString()),
        });

        runeStyle.slots.forEach((slot) => {
            slot.runes.forEach((rune) => {
                runeBatch.push({
                    body: {
                        name: rune.name,
                        perkId: rune.id.toString(),
                        styleId: runeStyle.id.toString(),
                    },
                    json: true,
                    method: "PUT",
                    uri: serverURLs.Rune.put(rune.id.toString()),
                });
            });
        });
    });

    // Styles must be done first because of foreign keys
    await runeStyleBatch.map(request);
    debug("Rune Styles added");

    await runeBatch.map(request);
    debug("Runes added");
}

interface IRuneStyle {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: IRuneSlot[];
}

interface IRuneSlot {
    runes: IRune[];
}

interface IRune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}
