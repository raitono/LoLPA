// tslint:disable-next-line:no-var-requires
const {Kayn, LRUCache, REGIONS} = require("kayn");

const cache = new LRUCache({max: 1000});

export = Kayn(process.env.RIOT_API_KEY)({
    cacheOptions: {
        cache,
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
