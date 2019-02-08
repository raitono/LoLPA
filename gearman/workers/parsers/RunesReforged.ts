// 3rd party imports
import * as fs from "fs";
import request from "request-promise-native";
import * as util from "util";

// my imports
import webServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:RunesReforged");
const readFileAsync = util.promisify(fs.readFile);

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Runes Reforged data
 */
export async function parse(filePath: string): Promise<void> {
    const runeStyleBatch = [];
    const runeDataFile: Buffer = await readFileAsync(filePath);
    const runeData: IRuneStyle[] = JSON.parse(runeDataFile.toString());
debug(runeData);
    // runeData.forEach((runeTree) => {
    //     const runeTreeId: string = runeTree.id.toString();
    //     runeStyleBatch.push({
    //         body: {
    //             name: runeTree.name,
    //             styleId: runeTreeId,
    //         },
    //         json: true,
    //         method: "PUT",
    //         uri: webServer.URLs.Rune.put_style(runeTreeId),
    //     });
    // });
    // await runeStyleBatch.map(request);

    // debug("Rune Styles added");
}

interface IRuneStyle {
    id: number;
    key: string;
    icon: string;
    name: string;
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
