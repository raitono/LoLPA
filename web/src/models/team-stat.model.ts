import {Entity, model, property} from '@loopback/repository';

@model()
export class TeamStat extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  gameId?: number;

  @property({
    type: 'number',
  })
  teamId?: number;

  @property({
    type: 'string',
    required: true,
  })
  win: string;

  @property({
    type: 'number',
    required: true,
  })
  baronKills: number;

  @property({
    type: 'number',
    required: true,
  })
  riftHeraldKills: number;

  @property({
    type: 'number',
    required: true,
  })
  vilemawKills: number;

  @property({
    type: 'number',
    required: true,
  })
  inhibitorKills: number;

  @property({
    type: 'number',
    required: true,
  })
  towerKills: number;

  @property({
    type: 'number',
    required: true,
  })
  dragonKills: number;

  @property({
    type: 'number',
    required: true,
  })
  dominionVictoryScore: number;

  @property({
    type: 'boolean',
    required: true,
  })
  firstDragon: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  firstInhibitor: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  firstRiftHerald: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  firstBlood: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  firstTower: boolean;

  constructor(data?: Partial<TeamStat>) {
    super(data);
  }
}
