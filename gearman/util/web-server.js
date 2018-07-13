module.exports.URLs = {
	DeltaType: {
		getAll: function() {
			return process.env.WEB_SERVER + '/Delta_Types';
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/Delta_Types?filter={"where":'+whereClause+'}';
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
	Participant: {
		put: function() {
			return process.env.WEB_SERVER + '/Participant';
		},
	},
	ParticipantStat: {
		put: function() {
			return process.env.WEB_SERVER + '/Participant_Stat';
		},
	},
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
	TeamStat: {
		put: function() {
			return process.env.WEB_SERVER + '/Team_Stat';
		},
	},
	TeamBan: {
		put: function() {
			return process.env.WEB_SERVER + '/Team_Ban';
		},
	},
	XrefSummonerGame: {
		put: function() {
			return process.env.WEB_SERVER + '/Xref_Summoner_Game';
		},
	},
};
