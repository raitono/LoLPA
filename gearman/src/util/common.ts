import * as fs from "fs";
import requestPromiseNative = require("request-promise-native");
import * as util from "util";

const rfa = util.promisify(fs.readFile);

export function request(value: requestPromiseNative.OptionsWithUri) {
    return requestPromiseNative(value);
}

export function readFileAsync(filepath: string) {
    return rfa(filepath);
}
