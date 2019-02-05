module.exports.URLs = {
	Champion: {
		put: (championId) => {
			return process.env.WEB_SERVER + '/champions/' + championId;
		},
	},
	ChampionTag: {
		get: () => {
			return process.env.WEB_SERVER + '/champion-tags';
		},
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/champion-tags?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/champion-tags';
		},
	},
	DeltaType: {
		getAll: () => {
			return process.env.WEB_SERVER + '/delta-types';
		},
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/delta-types?filter={"where":'+whereClause+'}';
		},
		put: (deltaTypeId) => {
			return process.env.WEB_SERVER + '/delta-types/' + deltaTypeId;
		},
	},
	Item: {
		post: () => {
			return process.env.WEB_SERVER + '/items';
		},
		put: (itemId) => {
			return process.env.WEB_SERVER + '/items/' + itemId;
		},
	},
	ItemStat: {
		put: (itemId, type) => {
			return process.env.WEB_SERVER + '/item-stats/' + itemId + '/' + type;
		},
		resetExists: () => {
			return process.env.WEB_SERVER + '/item-stats/resetExists';
		},
		deleteMissing: () => {
			return process.env.WEB_SERVER + '/item-stats/deleteMissing';
		},
	},
	ItemTag: {
		get: () => {
			return process.env.WEB_SERVER + '/item-tags';
		},
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/item-tags?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/item-tags';
		},
	},
	MatchList: {
		post: () => {
			return process.env.WEB_SERVER + '/match-lists';
		},
		put: (matchListId) => {
			return process.env.WEB_SERVER + '/match-lists/' + matchListId;
		},
	},
	Match: {
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/matches?filter={"where":'+whereClause+'}';
		},
		put: (matchId) => {
			return process.env.WEB_SERVER + '/matches/' + matchId;
		},
	},
	Participant: {
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/participants?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/participants';
		},
		put: (participantId) => {
			return process.env.WEB_SERVER + '/participants/' + participantId;
		},
	},
	ParticipantStat: {
		post: () => {
			return process.env.WEB_SERVER + '/participant-stats';
		},
		put: (statId) => {
			return process.env.WEB_SERVER + '/participant-stats/' + statId;
		},
	},
	ParticipantTimelineDelta: {
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/participant-timeline-deltas?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/participant-timeline-deltas';
		},
		put: (deltaId) => {
			return process.env.WEB_SERVER + '/participant-timeline-deltas/' + deltaId;
		},
	},
	Rune: {
		put: (perkId) => {
			return process.env.WEB_SERVER + '/perks/' + perkId;
		},
		put_style: (perkStyleId) => {
			return process.env.WEB_SERVER + '/perk-styles/' + perkStyleId;
		},
	},
	Summoner: {
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/summoners?filter={"where":'+whereClause+'}';
		},
		getByName: (name) => {
			return process.env.WEB_SERVER + '/summoners?filter={"where":{"name":"'+name+'"}}';
		},
		get: (puuid) => {
			return process.env.WEB_SERVER + '/summoners/' + puuid;
		},
		post: () => {
			return process.env.WEB_SERVER + '/summoners';
		},
		put: (puuid) => {
			return process.env.WEB_SERVER + '/summoners/' + puuid;
		},
	},
	SummonerSpell: {
		put: (spellId) => {
			return process.env.WEB_SERVER + '/spells/' + spellId;
		},
	},
	Season: {
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/seasons?filter={"where":'+whereClause+'}';
		},
	},
	TeamStat: {
		post: () => {
			return process.env.WEB_SERVER + '/team-stats';
		},
	},
	TeamBan: {
		post: () => {
			return process.env.WEB_SERVER + '/team-bans';
		},
	},
	XrefChampionTag: {
		get: () => {
			return process.env.WEB_SERVER + '/xref-champion-tags';
		},
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/xref-champion-tags?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/xref-champion-tags';
		},
	},
	XrefItemMap: {
		get: () => {
			return process.env.WEB_SERVER + '/xref-item-maps';
		},
		post: () => {
			return process.env.WEB_SERVER + '/xref-item-maps';
		},
	},
	XrefItemTag: {
		get: () => {
			return process.env.WEB_SERVER + '/xref-item-tags';
		},
		getWhere: (whereClause) => {
			return process.env.WEB_SERVER + '/xref-item-tags?filter={"where":'+whereClause+'}';
		},
		post: () => {
			return process.env.WEB_SERVER + '/xref-item-tags';
		},
	},
	XrefParticipantItem: {
		post: () => {
			return process.env.WEB_SERVER + '/xref-participant-items';
		},
		put: (xrefId) => {
			return process.env.WEB_SERVER + '/xref-participant-items/' + xrefId;
		},
	},
	XrefParticipantPerk: {
		post: () => {
			return process.env.WEB_SERVER + '/xref-participant-perks';
		},
		put: (xrefId) => {
			return process.env.WEB_SERVER + '/xref-participant-perks/' + xrefId;
		},
	},
};
