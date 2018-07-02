module.exports.URLs = {
	summonerNameExists: function(summonerName) {
		return process.env.WEB_SERVER + '/Summoners?filter={"where":{"name":"'+summonerName+'"}}';
	},
};
