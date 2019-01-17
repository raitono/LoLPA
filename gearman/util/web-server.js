module.exports.URLs = {
	Champion: {
		put: function(championId) {
			return process.env.WEB_SERVER + '/champions/' + championId;
		},
	},
	ChampionTag: {
		get: function() {
			return process.env.WEB_SERVER + '/champion-tags';
		},
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/champion-tags?filter={"where":'+whereClause+'}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/champion-tags';
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
		post: function() {
			return process.env.WEB_SERVER + '/items';
		},
		put: function(itemId) {
			return process.env.WEB_SERVER + '/items/' + itemId;
		},
	},
	ItemTag: {
		get: function() {
			return process.env.WEB_SERVER + '/item-tags';
		},
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/item-tags?filter={"where":'+whereClause+'}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/item-tags';
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
	Match: {
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
		post: function() {
			return process.env.WEB_SERVER + '/participant-stats';
		},
		put: function(statId) {
			return process.env.WEB_SERVER + '/participant-stats/' + statId;
		},
	},
	ParticipantTimelineDelta: {
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/participant-timeline-deltas?filter={"where":'+whereClause+'}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/participant-timeline-deltas';
		},
		put: function(deltaId) {
			return process.env.WEB_SERVER + '/participant-timeline-deltas/' + deltaId;
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
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/summoners?filter={"where":'+whereClause+'}';
		},
		getByName: function(name) {
			return process.env.WEB_SERVER + '/summoners?filter={"where":{"name":"'+name+'"}}';
		},
		get: function(puuid) {
			return process.env.WEB_SERVER + '/summoners/' + puuid;
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
	XrefChampionTag: {
		get: function() {
			return process.env.WEB_SERVER + '/xref-champion-tags';
		},
		getWhere: function(whereClause) {
			return process.env.WEB_SERVER + '/xref-champion-tags?filter={"where":'+whereClause+'}';
		},
		post: function() {
			return process.env.WEB_SERVER + '/xref-champion-tags';
		},
	},
	XrefParticipantItem: {
		post: function() {
			return process.env.WEB_SERVER + '/xref-participant-items';
		},
		put: function(xrefId) {
			return process.env.WEB_SERVER + '/xref-participant-items/' + xrefId;
		},
	},
	XrefParticipantPerk: {
		post: function() {
			return process.env.WEB_SERVER + '/xref-participant-perks';
		},
		put: function(xrefId) {
			return process.env.WEB_SERVER + '/xref-participant-perks/' + xrefId;
		},
	},
};
