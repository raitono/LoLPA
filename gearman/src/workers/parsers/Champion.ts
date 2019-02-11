// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const d: any = require("debug")("lolpa-gearman:Champion");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Champion data
 */
export async function parse(filePath: string): Promise<void> {
    const champDataFile: Buffer = await readFileAsync(filePath);
}
