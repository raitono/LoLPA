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
			return process.env.WEB_SERVER + '/Participants';
		},
	},
	ParticipantStat: {
		put: function() {
			return process.env.WEB_SERVER + '/Participant_Stats';
		},
	},
	ParticipantTimeline: {
		put: function() {
			return process.env.WEB_SERVER + '/Participant_Timelines';
		},
	},
	ParticipantTimelineDelta: {
		put: function() {
			return process.env.WEB_SERVER + '/Participant_Timeline_Deltas';
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
			return process.env.WEB_SERVER + '/Team_Stats';
		},
	},
	TeamBan: {
		put: function() {
			return process.env.WEB_SERVER + '/Team_Bans';
		},
	},
	XrefSummonerGame: {
		put: function() {
			return process.env.WEB_SERVER + '/Xref_Summoner_Games';
		},
		post: function() {
			return process.env.WEB_SERVER + '/Xref_Summoner_Games';
		},
		replaceOrCreate: function() {
			return process.env.WEB_SERVER + '/Xref_Summoner_Games/replaceOrCreate';
		},
		findOne: function(whereClause) {
			return process.env.WEB_SERVER + '/Xref_Summoner_Games/findOne?filter={"where":'+whereClause+'}';
		},
	},
	XrefParticipantItem: {
		put: function() {
			return process.env.WEB_SERVER + '/Xref_Participant_Items';
		},
	},
	XrefParticipantPerk: {
		put: function() {
			return process.env.WEB_SERVER + '/Xref_Participant_Perks';
		},
	},
};
