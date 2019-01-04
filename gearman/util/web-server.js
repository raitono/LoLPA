module.exports.URLs = {
	Champion: {
		put: function() {
			return process.env.WEB_SERVER + '/champions';
		},
	},
	DeltaType: {
		getAll: function() {
			return process.env.WEB_SERVER + '/delta-types';
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/delta-types?filter={"where":'+whereClause+'}';
		},
		put: function() {
			return process.env.WEB_SERVER + '/delta-types';
		},
	},
	Item: {
		put: function() {
			return process.env.WEB_SERVER + '/items';
		},
	},
	MatchList: {
		put: function() {
			return process.env.WEB_SERVER + '/match-lists';
		},
	},
	Matches: {
		put: function() {
			return process.env.WEB_SERVER + '/matches';
		},
	},
	Participant: {
		put: function() {
			return process.env.WEB_SERVER + '/participants';
		},
	},
	ParticipantStat: {
		put: function() {
			return process.env.WEB_SERVER + '/participant-stats';
		},
	},
	ParticipantTimeline: {
		put: function() {
			return process.env.WEB_SERVER + '/participant-timelines';
		},
	},
	ParticipantTimelineDelta: {
		put: function() {
			return process.env.WEB_SERVER + '/participant-timeline-delta';
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/participant-timeline-delta?filter={"where":'+whereClause+'}';
		},
	},
	Rune: {
		put: function() {
			return process.env.WEB_SERVER + '/perks';
		},
		put_style: function() {
			return process.env.WEB_SERVER + '/perk-styles';
		},
	},
	Summoner: {
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/summoners?filter={"where":'+whereClause+'}';
		},
		getByName: function(name) {
			return process.env.WEB_SERVER + '/summoners?filter={"where":{"name":"'+name+'"}}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/summoners';
		},
		patch: function() {
			return process.env.WEB_SERVER + '/summoners';
		},
	},
	SummonerSpell: {
		put: function() {
			return process.env.WEB_SERVER + '/spells';
		},
	},
	Season: {
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/seasons?filter={"where":'+whereClause+'}';
		},
	},
	TeamStat: {
		put: function() {
			return process.env.WEB_SERVER + '/team-stats';
		},
	},
	TeamBan: {
		put: function() {
			return process.env.WEB_SERVER + '/team-bans';
		},
	},
	XrefSummonerGame: {
		put: function() {
			return process.env.WEB_SERVER + '/xref-summoner-games';
		},
		post: function() {
			return process.env.WEB_SERVER + '/xref-summoner-games';
		},
		replaceOrCreate: function() {
			return process.env.WEB_SERVER + '/xref-summoner-games/replaceOrCreate';
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/xref-summoner-games?filter={"where":'+whereClause+'}';
		},
	},
	XrefParticipantItem: {
		put: function() {
			return process.env.WEB_SERVER + '/xref-participant-items';
		},
	},
	XrefParticipantPerk: {
		put: function() {
			return process.env.WEB_SERVER + '/xref-participant-perks';
		},
	},
};
