export class URLs {
    public Champion = {
        put: (championId: string) => {
            return process.env.WEB_SERVER + "/champions/" + championId;
        },
    };
    public ChampionTag = {
        get: () => {
            return process.env.WEB_SERVER + "/champion-tags";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/champion-tags?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/champion-tags";
        },
    };
    public DeltaType = {
        getAll: () => {
            return process.env.WEB_SERVER + "/delta-types";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/delta-types?filter={\"where\":" + whereClause + "}";
        },
        put: (deltaTypeId: string) => {
            return process.env.WEB_SERVER + "/delta-types/" + deltaTypeId;
        },
    };
    public Item = {
        post: () => {
            return process.env.WEB_SERVER + "/items";
        },
        put: (itemId: string) => {
            return process.env.WEB_SERVER + "/items/" + itemId;
        },
    };
    public ItemStat = {
        deleteMissing: () => {
            return process.env.WEB_SERVER + "/item-stats/deleteMissing";
        },
        put: (itemId: string, type: string) => {
            return process.env.WEB_SERVER + "/item-stats/" + itemId + "/" + type;
        },
        resetExists: () => {
            return process.env.WEB_SERVER + "/item-stats/resetExists";
        },
    };
    public ItemTag = {
        get: () => {
            return process.env.WEB_SERVER + "/item-tags";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/item-tags?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/item-tags";
        },
    };
    public Match = {
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/matches?filter={\"where\":" + whereClause + "}";
        },
        put: (matchId) => {
            return process.env.WEB_SERVER + "/matches/" + matchId;
        },
    };
    public MatchList = {
        post: () => {
            return process.env.WEB_SERVER + "/match-lists";
        },
        put: (matchListId: string) => {
            return process.env.WEB_SERVER + "/match-lists/" + matchListId;
        },
    };
    public Participant = {
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/participants?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/participants";
        },
        put: (participantId: string) => {
            return process.env.WEB_SERVER + "/participants/" + participantId;
        },
    };
    public ParticipantStat = {
        post: () => {
            return process.env.WEB_SERVER + "/participant-stats";
        },
        put: (statId: string) => {
            return process.env.WEB_SERVER + "/participant-stats/" + statId;
        },
    };
    public ParticipantTimelineDelta = {
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/participant-timeline-deltas?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/participant-timeline-deltas";
        },
        put: (deltaId: string) => {
            return process.env.WEB_SERVER + "/participant-timeline-deltas/" + deltaId;
        },
    };
    public Rune = {
        put: (perkId: string) => {
            return process.env.WEB_SERVER + "/perks/" + perkId;
        },
        put_style: (perkStyleId) => {
            return process.env.WEB_SERVER + "/perk-styles/" + perkStyleId;
        },
    };
    public Season = {
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/seasons?filter={\"where\":" + whereClause + "}";
        },
    };
    public Summoner = {
        get: (puuid: string) => {
            return process.env.WEB_SERVER + "/summoners/" + puuid;
        },
        getByName: (name: string) => {
            return process.env.WEB_SERVER + "/summoners?filter={\"where\":{\"name\":\"" + name + "\"}}";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/summoners?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/summoners";
        },
        put: (puuid: string) => {
            return process.env.WEB_SERVER + "/summoners/" + puuid;
        },
    };
    public SummonerSpell = {
        put: (spellId: string) => {
            return process.env.WEB_SERVER + "/spells/" + spellId;
        },
    };
    public TeamBan = {
        post: () => {
            return process.env.WEB_SERVER + "/team-bans";
        },
    };
    public TeamStat = {
        post: () => {
            return process.env.WEB_SERVER + "/team-stats";
        },
    };
    public XrefChampionTag = {
        get: () => {
            return process.env.WEB_SERVER + "/xref-champion-tags";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/xref-champion-tags?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-champion-tags";
        },
    };
    public XrefItemMap = {
        get: () => {
            return process.env.WEB_SERVER + "/xref-item-maps";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-item-maps";
        },
    };
    public XrefItemTag = {
        get: () => {
            return process.env.WEB_SERVER + "/xref-item-tags";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/xref-item-tags?filter={\"where\":" + whereClause + "}";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-item-tags";
        },
    };
    public XrefParticipantItem = {
        post: () => {
            return process.env.WEB_SERVER + "/xref-participant-items";
        },
        put: (xrefId: string) => {
            return process.env.WEB_SERVER + "/xref-participant-items/" + xrefId;
        },
    };
    public XrefParticipantPerk = {
        post: () => {
            return process.env.WEB_SERVER + "/xref-participant-perks";
        },
        put: (xrefId: string) => {
            return process.env.WEB_SERVER + "/xref-participant-perks/" + xrefId;
        },
    };
}
