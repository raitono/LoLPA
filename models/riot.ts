export const enum RiotQueueType {
    RANKED_SOLO = 'RANKED_SOLO_5x5',
    RANKED_FLEX = 'RANKED_FLEX_SR'
}

export interface RiotImage {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
}

export interface RiotMiniSeries {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export interface RiotLeagueEntryDTO {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
    miniSeries?: RiotMiniSeries;
}

interface RiotRune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

interface RiotRuneSlot {
    runes: RiotRune[]
}

export interface RiotRunesDto {
    id: number;
    key: string;
    icon: string;
    slots: RiotRuneSlot[]
}

interface IRiotSummonerSpellMapping {
    [index: number]: string;
  }

export const RiotSummonerSpellMapping: IRiotSummonerSpellMapping = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  32: 'SummonerSnowball',
  39: 'SummonerSnowURFSnowball_Mark',
  54: 'Summoner_UltBook_Placeholder',
};
