module.exports.URLs = {
	summonerExists: function(whereClause) {
		return process.env.WEB_SERVER + '/Summoners?filter={"where":"'+whereClause+'"}}';
	},
	upsertWithWhere: function(whereClause) {
		return process.env.WEB_SERVER + '/Summoners/upsertWithWhere?where='+whereClause;
	},
};
