export class URLs {
    public Champion = {
        put: (championId: number) => {
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
        batch: () => {
            return process.env.WEB_SERVER + "/items/batch";
        },
        delete: (itemId: number) => {
            return process.env.WEB_SERVER + "/items/" + itemId;
        },
        get: () => {
            return process.env.WEB_SERVER + "/items";
        },
        post: () => {
            return process.env.WEB_SERVER + "/items";
        },
        put: (itemId: number) => {
            return process.env.WEB_SERVER + "/items/" + itemId;
        },
    };
    public ItemStat = {
        delete: (itemStatId: number) => {
            return process.env.WEB_SERVER + "/item-stats/" + itemStatId;
        },
        get: () => {
            return process.env.WEB_SERVER + "/item-stats";
        },
        put: (itemId: number, type: string) => {
            return process.env.WEB_SERVER + "/item-stats/" + itemId + "/" + type;
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
        batch: () => {
            return process.env.WEB_SERVER + "/matches/batch";
        },
        get: () => {
            return process.env.WEB_SERVER + "/matches";
        },
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/matches?filter={\"where\":" + whereClause + "}";
        },
        put: (matchId) => {
            return process.env.WEB_SERVER + "/matches/" + matchId;
        },
    };
    public MatchList = {
        batch: () => {
            return process.env.WEB_SERVER + "/match-lists/batch";
        },
        post: () => {
            return process.env.WEB_SERVER + "/match-lists";
        },
        put: (matchListId: string) => {
            return process.env.WEB_SERVER + "/match-lists/" + matchListId;
        },
    };
    public MetaData = {
        getWhere: (whereClause: string) => {
            return process.env.WEB_SERVER + "/metadata?filter={\"where\":" + whereClause + "}";
        },
        put: (metadataId: number) => {
            return process.env.WEB_SERVER + "/metadata/" + metadataId;
        },
    };
    public Participant = {
        batch: () => {
            return process.env.WEB_SERVER + "/participants/batch";
        },
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
        batch: () => {
            return process.env.WEB_SERVER + "/participant-stats/batch";
        },
        post: () => {
            return process.env.WEB_SERVER + "/participant-stats";
        },
        put: (statId: string) => {
            return process.env.WEB_SERVER + "/participant-stats/" + statId;
        },
    };
    public ParticipantTimelineDelta = {
        batch: () => {
            return process.env.WEB_SERVER + "/participant-timeline-deltas/batch";
        },
        get: () => {
            return process.env.WEB_SERVER + "/participant-timeline-deltas";
        },
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
        batch: () => {
            return process.env.WEB_SERVER + "/team-bans/batch";
        },
        post: () => {
            return process.env.WEB_SERVER + "/team-bans";
        },
    };
    public TeamStat = {
        batch: () => {
            return process.env.WEB_SERVER + "/team-stats/batch";
        },
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
        delete: (xrefId: number) => {
            return process.env.WEB_SERVER + "/xref-item-maps/" + xrefId;
        },
        get: () => {
            return process.env.WEB_SERVER + "/xref-item-maps";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-item-maps";
        },
        put: (itemId: number, mapId: number) => {
            return process.env.WEB_SERVER + "/xref-item-maps/" + itemId + "/" + mapId;
        },
    };
    public XrefItemTag = {
        batch: () => {
            return process.env.WEB_SERVER + "/xref-item-tags/batch";
        },
        delete: (xrefId: number) => {
            return process.env.WEB_SERVER + "/xref-item-tags/" + xrefId;
        },
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
        batch: () => {
            return process.env.WEB_SERVER + "/xref-participant-items/batch";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-participant-items";
        },
        put: (xrefId: string) => {
            return process.env.WEB_SERVER + "/xref-participant-items/" + xrefId;
        },
    };
    public XrefParticipantPerk = {
        batch: () => {
            return process.env.WEB_SERVER + "/xref-participant-perks/batch";
        },
        post: () => {
            return process.env.WEB_SERVER + "/xref-participant-perks";
        },
        put: (xrefId: string) => {
            return process.env.WEB_SERVER + "/xref-participant-perks/" + xrefId;
        },
    };
}
