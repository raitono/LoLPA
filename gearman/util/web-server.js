module.exports.URLs = {
	Champion: {
		put: function() {
			return process.env.WEB_SERVER + '/Champions';
		},
	},
	DeltaType: {
		getAll: function() {
			return process.env.WEB_SERVER + '/Delta_Types';
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/Delta_Types?filter={"where":'+whereClause+'}';
		},
		put: function() {
			return process.env.WEB_SERVER + '/Delta_Types';
		},
	},
	Item: {
		put: function() {
			return process.env.WEB_SERVER + '/Items';
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
			return process.env.WEB_SERVER + '/Participant_Timeline_Delta';
		},
		findOne: function(whereClause) {
			return process.env.WEB_SERVER + '/Participant_Timeline_Delta/findOne?filter={"where":'+whereClause+'}';
		},
	},
	Rune: {
		put: function() {
			return process.env.WEB_SERVER + '/Perks';
		},
		put_style: function() {
			return process.env.WEB_SERVER + '/Perk_Styles';
		},
	},
	Summoner: {
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/Summoners?filter={"where":'+whereClause+'}';
		},
		getByName: function(name) {
			return process.env.WEB_SERVER + '/Summoners/findOne?filter={"where":{"name":"'+name+'"}}';
		},
		upsertWithWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/Summoners/upsertWithWhere?where='+whereClause;
		},
	},
	SummonerSpell: {
		put: function() {
			return process.env.WEB_SERVER + '/Spells';
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
