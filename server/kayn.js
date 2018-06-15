const { Kayn, LRUCache, REGIONS } = require('kayn');

const cache = new LRUCache({ max: 1000 });

let kayn = Kayn(process.env.RIOT_API_KEY)({
	region: REGIONS.NORTH_AMERICA,
	debugOptions: {
		isEnabled: true,
		showKey: true,
	},
	requestOptions: {
		numberOfRetriesBeforeAbort: 3,
		delayBeforeRetry: 3000,
	},
	cacheOptions: {
		cache,
		timeToLives: {
			useDefault: true,
		}
	}
});

module.exports = kayn;