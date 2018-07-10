module.exports.URLs = {
	Summoner: {
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/Summoners?filter={"where":'+whereClause+'}';
		},
		upsertWithWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/Summoners/upsertWithWhere?where='+whereClause;
		},
	},
	Season: {
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/Seasons?filter={"where":'+whereClause+'}';
		},
	},
	MatchList: {
		put: function() {
			return process.env.WEB_SERVER + '/Match_Lists';
		},
	},
	Matches: {
		put: function() {
			return process.env.WEB_SERVER + '/Matches';
		},
	},
};
