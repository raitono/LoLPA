// Champion Interfaces
export interface IChampionFileWrapper {
    type: string;
    format: string;
    version: string;
    data: any;
}
export interface IChampion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: IChampionInfo;
    image: IImage;
    tags: string[];
    partype: string;
    stats: IChampionStats;
}
export interface IChampionInfo {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}
export interface IImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface IChampionStats {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}

// Item Interfaces
export interface IItemFileWrapper {
    type: string;
    version: string;
    basic: IItem;
    data: any;
    groups: Array<{ id: string; MaxGroupOwnable: string; }>;
    tree: Array<{ header: string; tags: string[]; }>;
}
export interface IItem {
    id?: number;
    name: string;
    rune?: {
        isrune: boolean;
        tier: number;
        type: string;
    };
    gold: {
        base: number;
        total: number;
        sell: number;
        purchasable: boolean;
    };
    group?: string;
    description: string;
    colloq: string;
    plaintext: string;
    consumed?: boolean;
    stacks?: number;
    depth?: number;
    consumeOnFull?: boolean;
    from?: string[];
    into?: string[];
    specialRecipe?: number;
    inStore?: boolean;
    hideFromAll?: boolean;
    requiredChampion?: string;
    requiredAlly?: string;
    stats: IItemStats;
    tags: string[];
    maps: {
        10?: boolean;
        11?: boolean;
        12?: boolean;
        21?: boolean;
    };
}
export interface IItemStats {
    FlatHPPoolMod: number;
    rFlatHPModPerLevel: number;
    FlatMPPoolMod: number;
    rFlatMPModPerLevel: number;
    PercentHPPoolMod: number;
    PercentMPPoolMod: number;
    FlatHPRegenMod: number;
    rFlatHPRegenModPerLevel: number;
    PercentHPRegenMod: number;
    FlatMPRegenMod: number;
    rFlatMPRegenModPerLevel: number;
    PercentMPRegenMod: number;
    FlatArmorMod: number;
    rFlatArmorModPerLevel: number;
    PercentArmorMod: number;
    rFlatArmorPenetrationMod: number;
    rFlatArmorPenetrationModPerLevel: number;
    rPercentArmorPenetrationMod: number;
    rPercentArmorPenetrationModPerLevel: number;
    FlatPhysicalDamageMod: number;
    rFlatPhysicalDamageModPerLevel: number;
    PercentPhysicalDamageMod: number;
    FlatMagicDamageMod: number;
    rFlatMagicDamageModPerLevel: number;
    PercentMagicDamageMod: number;
    FlatMovementSpeedMod: number;
    rFlatMovementSpeedModPerLevel: number;
    PercentMovementSpeedMod: number;
    rPercentMovementSpeedModPerLevel: number;
    FlatAttackSpeedMod: number;
    PercentAttackSpeedMod: number;
    rPercentAttackSpeedModPerLevel: number;
    rFlatDodgeMod: number;
    rFlatDodgeModPerLevel: number;
    PercentDodgeMod: number;
    FlatCritChanceMod: number;
    rFlatCritChanceModPerLevel: number;
    PercentCritChanceMod: number;
    FlatCritDamageMod: number;
    rFlatCritDamageModPerLevel: number;
    PercentCritDamageMod: number;
    FlatBlockMod: number;
    PercentBlockMod: number;
    FlatSpellBlockMod: number;
    rFlatSpellBlockModPerLevel: number;
    PercentSpellBlockMod: number;
    FlatEXPBonus: number;
    PercentEXPBonus: number;
    rPercentCooldownMod: number;
    rPercentCooldownModPerLevel: number;
    rFlatTimeDeadMod: number;
    rFlatTimeDeadModPerLevel: number;
    rPercentTimeDeadMod: number;
    rPercentTimeDeadModPerLevel: number;
    rFlatGoldPer10Mod: number;
    rFlatMagicPenetrationMod: number;
    rFlatMagicPenetrationModPerLevel: number;
    rPercentMagicPenetrationMod: number;
    rPercentMagicPenetrationModPerLevel: number;
    FlatEnergyRegenMod: number;
    rFlatEnergyRegenModPerLevel: number;
    FlatEnergyPoolMod: number;
    rFlatEnergyModPerLevel: number;
    PercentLifeStealMod: number;
    PercentSpellVampMod: number;
}

// Rune Interfaces
export interface IRuneStyle {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: IRuneSlot[];
}
export interface IRuneSlot {
    runes: IRune[];
}
export interface IRune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

// Summoner Spell Interfaces
export interface ISummonerSpellFileWrapper {
    type: string;
    version: string;
    data: any;
}
export interface ISummonerSpell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: string;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    dataValues: any;
    effect: number[][];
    effectBurn: string[];
    vars: ISpellVars[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: IImage;
    resource: string;
}
export interface ISpellVars {
    link: string;
    coeff: number;
    key: string;
}

// Even though these are Dates in the database, they are parsed as string by JSON.parse
export interface IDBSummoner {
    accountId: string;
    lastUpdated?: string;
    name: string;
    profileIconId: number;
    puuid: string;
    revisionDate: string;
    summonerId: string;
    summonerLevel: number;
}

/**
 * Summoner object received from the Riot API.
 * revisionDate is type long and represents a UNIX timestamp in milliseconds
 */
export interface IAPISummoner {
    accountId: string;
    id: string;
    name: string;
    profileIconId: number;
    puuid: string;
    revisionDate: number;
    summonerLevel: number;
}

// Match Interfaces
export interface IMatchOptions {
    beginTime?: number;
    endTime?: number;
}
export interface IAPIMatchListWrapper {
    matches: IAPIMatchList[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}
export interface IAPIMatchList {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}
export interface IDBDeltaTypes {
    id: number;
    name: string;
}
export interface IAPIMatch {
    seasonId: number;
    queueId: number;
    gameId: number;
    participantIdentities: IParticipantIdentity[];
    gameVersion: string;
    platformId: string;
    gameMode: string;
    mapId: number;
    gameType: string;
    teams: ITeam[];
    participants: IAPIParticipant[];
    gameDuration: number;
    gameCreation: number;
}
export interface IParticipantIdentity {
    player: IPlayer;
    participantId: number;
}
export interface IPlayer {
    currentPlatformId: string;
    summonerName: string;
    matchHistoryUri: string;
    platformId: string;
    currentAccountId: string;
    profileIcon: number;
    summonerId: string;
    accountId: string;
}
export interface ITeam {
    firstDragon: boolean;
    bans: IBan[];
    firstInhibitor: boolean;
    win: string;
    firstRiftHerald: boolean;
    firstBaron: boolean;
    baronKills: number;
    riftHeraldKills: number;
    firstBlood: boolean;
    teamId: number;
    firstTower: boolean;
    vilemawKills: number;
    inhibitorKills: number;
    towerKills: number;
    dominionVictoryScore: number;
    dragonKills: number;
}
export interface IBan {
    pickTurn: number;
    championId: number;
}
export interface IAPIParticipant {
    spell1Id: number;
    participantId: number;
    timeline: IParticipantTimeline;
    spell2Id: number;
    teamId: number;
    stats: IParticipantStats;
    championId: number;
    highestAchievedSeasonTier?: string;
}
export interface IDBParticipant {
    id: number;
    gameId: number;
    participantId: number;
    accountId: string;
    championId: number;
    spell1Id: number;
    spell2Id: number;
    teamId: number;
    lane: string;
    role: string;
    highestAchievedSeasonTier: string;
}
export interface IParticipantTimeline {
    lane: string;
    participantId: number;
    goldPerMinDeltas: IParticipantTimeLineDelta;
    creepsPerMinDeltas: IParticipantTimeLineDelta;
    xpPerMinDeltas: IParticipantTimeLineDelta;
    role: string;
    damagePerMinDeltas: IParticipantTimeLineDelta;
}
export interface IParticipantTimeLineDelta {
    "0-10"?: number;
    "10-20"?: number;
    "20-30"?: number;
    "30-end"?: number;
}
export interface IParticipantStats {
    neutralMinionsKilledTeamJungle: number;
    visionScore: number;
    magicDamageDealtToChampions: number;
    largestMultiKill: number;
    totalTimeCrowdControlDealt: number;
    longestTimeSpentLiving: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    tripleKills: number;
    perk5: number;
    perk4: number;
    playerScore9: number;
    playerScore8: number;
    kills: number;
    playerScore1: number;
    playerScore0: number;
    playerScore3: number;
    playerScore2: number;
    playerScore5: number;
    playerScore4: number;
    playerScore7: number;
    playerScore6: number;
    perk5Var1: number;
    perk5Var3: number;
    perk5Var2: number;
    totalScoreRank: number;
    neutralMinionsKilled: number;
    statPerk1: number;
    statPerk0: number;
    damageDealtToTurrets: number;
    physicalDamageDealtToChampions: number;
    damageDealtToObjectives: number;
    perk2Var2: number;
    perk2Var3: number;
    totalUnitsHealed: number;
    perk2Var1: number;
    perk4Var1: number;
    totalDamageTaken: number;
    perk4Var3: number;
    wardsKilled: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    quadraKills: number;
    magicDamageDealt: number;
    firstBloodAssist: boolean;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    perk0: number;
    perk1: number;
    perk2: number;
    perk3: number;
    perk3Var3: number;
    perk3Var2: number;
    perk3Var1: number;
    damageSelfMitigated: number;
    magicalDamageTaken: number;
    perk0Var2: number;
    firstInhibitorKill: boolean;
    trueDamageTaken: number;
    assists: number;
    perk4Var2: number;
    goldSpent: number;
    trueDamageDealt: number;
    participantId: number;
    physicalDamageDealt: number;
    sightWardsBoughtInGame: number;
    totalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    totalPlayerScore: number;
    win: boolean;
    objectivePlayerScore: number;
    totalDamageDealt: number;
    neutralMinionsKilledEnemyJungle: number;
    deaths: number;
    wardsPlaced: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    turretKills: number;
    firstBloodKill: number;
    trueDamageDealtToChampions: number;
    goldEarned: number;
    killingSprees: number;
    unrealKills: number;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    champLevel: number;
    doubleKills: number;
    inhibitorKills: number;
    firstInhibitorAssist: boolean;
    perk0Var1: number;
    combatPlayerScore: number;
    perk0Var3: number;
    visionWardsBoughtInGame: number;
    pentaKills: number;
    totalHeal: number;
    totalMinionsKilled: number;
    timeCCingOthers: number;
    statPerk2: number;
    altarsCaptured: number;
    altarsNeutralized: number;
    nodeCapture: number;
    nodeCaptureAssist: number;
    nodeNeutralize: number;
    nodeNeutralizeAssists: number;
    teamObjective: number;
}
