import * as fs from "fs";
import { Kayn, KaynClass, LRUCache, REGIONS } from "kayn";
import requestPromiseNative = require("request-promise-native");
import * as util from "util";

// tslint:disable-next-line:no-var-requires
const debug = require("debug")("lolpa-gearman:Common");
const rfa = util.promisify(fs.readFile);
const kaynCache = new LRUCache({max: 1000});

const kayn: KaynClass = Kayn(process.env.RIOT_API_KEY)({
        cacheOptions: {
            cache: kaynCache,
            timeToLives: {
                useDefault: true,
            },
        },
        debugOptions: {
            isEnabled: true,
            showKey: false,
        },
        region: REGIONS.NORTH_AMERICA,
        requestOptions: {
            delayBeforeRetry: 3000,
            numberOfRetriesBeforeAbort: 3,
        },
    });

export { kayn };

export async function request(value: requestPromiseNative.OptionsWithUri)
: Promise<any> {
    return requestPromiseNative(value).catch((error) => {
        if (error.error.error && error.error.error.statusCode === 413 && Array.isArray(value.body)) {
            debug("Too big, splitting");
            debug(value.uri.toString());

            return Promise.all([request({
                body: value.body.splice(0, Math.ceil((value.body.length - 1) / 2)),
                json: value.json,
                method: value.method,
                uri: value.uri,
            }),
            request({
                body: value.body,
                json: value.json,
                method: value.method,
                uri: value.uri,
            })]);
        } else {
            debug(value);
            throw error;
        }
    });
}

export function readFileAsync(filepath: string) {
    return rfa(filepath);
}

export async function batchRequest(requests: requestPromiseNative.OptionsWithUri[]) {
    const k: number = parseInt(process.env.MAX_REQUEST_BATCH_SIZE);
    const result: Array<requestPromiseNative.RequestPromise<any>> = [];

    debug(requests.length + " requests batched");
    for (let n = 0; n * k < requests.length; n++) {
        const b = n * k;
        let e = (n + 1) * k;

        if (e > requests.length) {
            e = requests.length;
        }

        const t = requests.slice(b, e);
        result.concat(await Promise.all(t.map(request)));
        debug(e + " done");
    }
    return result;
}

export function mysql_real_escape_string (str: string) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
