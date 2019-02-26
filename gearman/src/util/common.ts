import * as fs from "fs";
import requestPromiseNative = require("request-promise-native");
import * as util from "util";

// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Common");

const rfa = util.promisify(fs.readFile);

export function request(value: requestPromiseNative.OptionsWithUri) {
    return requestPromiseNative(value);
}

export function readFileAsync(filepath: string) {
    return rfa(filepath);
}

export async function batchRequest(requests: requestPromiseNative.OptionsWithUri[]) {
    const k: number = parseInt(process.env.MAX_REQUEST_BATCH_SIZE);
    const result: Array<requestPromiseNative.RequestPromise<any>> = [];
    let n = 0;
    for (let n = 0; n * k < requests.length; n++) {
        const b = n * k;
        let e = (n + 1) * k;

        if (e > requests.length) {
            e = requests.length;
        }

        debug("B: " + b);
        debug("E: " + e);

        const t = requests.slice(b, e);
        result.concat(await Promise.all(t.map(request)));
    }
    return result;
}
