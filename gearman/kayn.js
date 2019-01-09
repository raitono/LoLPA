const {Kayn, LRUCache, REGIONS} = require('kayn');

const cache = new LRUCache({max: 1000});

module.exports = Kayn(process.env.RIOT_API_KEY)({
	region: REGIONS.NORTH_AMERICA,
	debugOptions: {
		isEnabled: true,
		showKey: false,
	},
	requestOptions: {
		numberOfRetriesBeforeAbort: 3,
		delayBeforeRetry: 3000,
	},
	cacheOptions: {
		cache,
		timeToLives: {
			useDefault: true,
		},
	},
});
