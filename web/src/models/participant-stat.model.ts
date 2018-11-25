import {Entity, model, property} from '@loopback/repository';

@model()
export class ParticipantStat extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  gameId?: number;

  @property({
    type: 'number',
    id: true,
  })
  participantId?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  win: boolean;

  @property({
    type: 'number',
    required: true,
  })
  kills: number;

  @property({
    type: 'number',
    required: true,
  })
  deaths: number;

  @property({
    type: 'number',
    required: true,
  })
  assists: number;

  @property({
    type: 'number',
    required: true,
  })
  largestKillingSpree: number;

  @property({
    type: 'number',
    required: true,
  })
  killingSprees: number;

  @property({
    type: 'number',
    required: true,
  })
  largestMultiKill: number;

  @property({
    type: 'number',
    required: true,
  })
  doubleKills: number;

  @property({
    type: 'number',
    required: true,
  })
  tripleKills: number;

  @property({
    type: 'number',
    required: true,
  })
  quadraKills: number;

  @property({
    type: 'number',
    required: true,
  })
  pentaKills: number;

  @property({
    type: 'number',
    required: true,
  })
  unrealKills: number;

  @property({
    type: 'number',
    required: true,
  })
  physicalDamageDealt: number;

  @property({
    type: 'number',
    required: true,
  })
  physicalDamageDealtToChampions: number;

  @property({
    type: 'number',
    required: true,
  })
  magicDamageDealt: number;

  @property({
    type: 'number',
    required: true,
  })
  magicDamageDealtToChampions: number;

  @property({
    type: 'number',
    required: true,
  })
  trueDamageDealt: number;

  @property({
    type: 'number',
    required: true,
  })
  trueDamageDealtToChampions: number;

  @property({
    type: 'number',
    required: true,
  })
  totalDamageDealtToChampions: number;

  @property({
    type: 'number',
    required: true,
  })
  damageDealtToObjectives: number;

  @property({
    type: 'number',
    required: true,
  })
  totalDamageDealt: number;

  @property({
    type: 'number',
    required: true,
  })
  totalUnitsHealed: number;

  @property({
    type: 'number',
    required: true,
  })
  totalHeal: number;

  @property({
    type: 'number',
    required: true,
  })
  largestCriticalStrike: number;

  @property({
    type: 'number',
    required: true,
  })
  totalMinionsKilled: number;

  @property({
    type: 'number',
    required: true,
  })
  neutralMinionsKilled: number;

  @property({
    type: 'number',
    required: true,
  })
  neutralMinionsKilledTeamJungle: number;

  @property({
    type: 'number',
    required: true,
  })
  neutralMinionsKilledEnemyJungle: number;

  @property({
    type: 'number',
    required: true,
  })
  sightWardsBoughtInGame: number;

  @property({
    type: 'number',
    required: true,
  })
  visionWardsBoughtInGame: number;

  @property({
    type: 'number',
    required: true,
  })
  wardsKilled: number;

  @property({
    type: 'number',
    required: true,
  })
  wardsPlaced: number;

  @property({
    type: 'number',
    required: true,
  })
  visionScore: number;

  @property({
    type: 'number',
    required: true,
  })
  objectivePlayerScore: number;

  @property({
    type: 'number',
    required: true,
  })
  combatPlayerScore: number;

  @property({
    type: 'number',
    required: true,
  })
  totalPlayerScore: number;

  @property({
    type: 'number',
    required: true,
  })
  totalScoreRank: number;

  @property({
    type: 'number',
    required: true,
  })
  altarsCaptured: number;

  @property({
    type: 'number',
    required: true,
  })
  teamObjective: number;

  @property({
    type: 'number',
    required: true,
  })
  totalTimeCrowdControlDealt: number;

  @property({
    type: 'number',
    required: true,
  })
  timeCCingOthers: number;

  @property({
    type: 'number',
    required: true,
  })
  longestTimeSpentLiving: number;

  @property({
    type: 'number',
    required: true,
  })
  turretKills: number;

  @property({
    type: 'number',
    required: true,
  })
  damageDealtToTurrets: number;

  @property({
    type: 'number',
    required: true,
  })
  inhibitorKills: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstTowerAssist: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstTowerKill: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstBloodAssist: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstInhibitorKill: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstInhibitorAssist: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstBloodKill: boolean;

  @property({
    type: 'number',
    required: true,
  })
  champLevel: number;

  @property({
    type: 'number',
    required: true,
  })
  nodeNeutralize: number;

  @property({
    type: 'number',
    required: true,
  })
  nodeNeutralizeAssist: number;

  @property({
    type: 'number',
    required: true,
  })
  nodeCapture: number;

  @property({
    type: 'number',
    required: true,
  })
  nodeCaptureAssist: number;

  @property({
    type: 'number',
    required: true,
  })
  altarsNeutralized: number;

  @property({
    type: 'number',
    required: true,
  })
  goldEarned: number;

  @property({
    type: 'number',
    required: true,
  })
  goldSpent: number;

  @property({
    type: 'number',
    required: true,
  })
  physicalDamageTaken: number;

  @property({
    type: 'number',
    required: true,
  })
  magicalDamageTaken: number;

  @property({
    type: 'number',
    required: true,
  })
  trueDamageTaken: number;

  @property({
    type: 'number',
    required: true,
  })
  totalDamageTaken: number;

  @property({
    type: 'number',
    required: true,
  })
  perkPrimaryStyle: number;

  @property({
    type: 'number',
    required: true,
  })
  perkSubStyle: number;

  constructor(data?: Partial<ParticipantStat>) {
    super(data);
  }
}
