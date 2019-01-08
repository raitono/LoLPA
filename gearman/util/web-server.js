module.exports.URLs = {
	Champion: {
		put: function(championId) {
			return process.env.WEB_SERVER + '/champions/' + championId;
		},
	},
	DeltaType: {
		getAll: function() {
			return process.env.WEB_SERVER + '/delta-types';
		},
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/delta-types?filter={"where":'+whereClause+'}';
		},
		put: function(deltaTypeId) {
			return process.env.WEB_SERVER + '/delta-types/' + deltaTypeId;
		},
	},
	Item: {
		put: function(itemId) {
			return process.env.WEB_SERVER + '/items/' + itemId;
		},
	},
	MatchList: {
		post: function() {
			return process.env.WEB_SERVER + '/match-lists';
		},
		put: function(matchListId) {
			return process.env.WEB_SERVER + '/match-lists/' + matchListId;
		},
	},
	Matches: {
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/matches?filter={"where":'+whereClause+'}';
		},
		put: function(matchId) {
			return process.env.WEB_SERVER + '/matches/' + matchId;
		},
	},
	Participant: {
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/participants?filter={"where":'+whereClause+'}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/participants';
		},
		put: function(participantId) {
			return process.env.WEB_SERVER + '/participants/' + participantId;
		},
	},
	ParticipantStat: {
		put: function(statId) {
			return process.env.WEB_SERVER + '/participant-stats/' + statId;
		},
	},
	ParticipantTimeline: {
		put: function(timelineId) {
			return process.env.WEB_SERVER + '/participant-timelines/' + timelineId;
		},
	},
	ParticipantTimelineDelta: {
		put: function(deltaId) {
			return process.env.WEB_SERVER + '/participant-timeline-delta/' + deltaId;
		},
		get: function(whereClause) {
			return process.env.WEB_SERVER + '/participant-timeline-delta?filter={"where":'+whereClause+'}';
		},
	},
	Rune: {
		put: function(perkId) {
			return process.env.WEB_SERVER + '/perks/' + perkId;
		},
		put_style: function(perkStyleId) {
			return process.env.WEB_SERVER + '/perk-styles/' + perkStyleId;
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
		put: function(puuid) {
			return process.env.WEB_SERVER + '/summoners/' + puuid;
		},
	},
	SummonerSpell: {
		put: function(spellId) {
			return process.env.WEB_SERVER + '/spells/' + spellId;
		},
	},
	Season: {
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/seasons?filter={"where":'+whereClause+'}';
		},
	},
	TeamStat: {
		post: function() {
			return process.env.WEB_SERVER + '/team-stats';
		},
	},
	TeamBan: {
		post: function() {
			return process.env.WEB_SERVER + '/team-bans';
		},
	},
	XrefParticipantItem: {
		put: function(xrefId) {
			return process.env.WEB_SERVER + '/xref-participant-items/' + xrefId;
		},
	},
	XrefParticipantPerk: {
		put: function(xrefId) {
			return process.env.WEB_SERVER + '/xref-participant-perks/' + xrefId;
		},
	},
};
