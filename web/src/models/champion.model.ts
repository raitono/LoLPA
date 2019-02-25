import {Entity, model, property} from '@loopback/repository';

@model()
export class Champion extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  championId?: number;

  @property({
    type: 'string',
    required: true,
  })
  version: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  partype: string;

  @property({
    type: 'number',
    required: true,
  })
  hp: number;

  @property({
    type: 'number',
    required: true,
  })
  hpperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  mp: number;

  @property({
    type: 'number',
    required: true,
  })
  mpperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  movespeed: number;

  @property({
    type: 'number',
    required: true,
  })
  armor: number;

  @property({
    type: 'number',
    required: true,
  })
  armorperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  spellblock: number;

  @property({
    type: 'number',
    required: true,
  })
  spellblockperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  attackrange: number;
  

  @property({
    type: 'number',
    required: true,
  })
  hpregen: number;
  

  @property({
    type: 'number',
    required: true,
  })
  hpregenperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  mpregen: number;

  @property({
    type: 'number',
    required: true,
  })
  mpregenperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  crit: number;

  @property({
    type: 'number',
    required: true,
  })
  critperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  attackdamage: number;

  @property({
    type: 'number',
    required: true,
  })
  attackdamageperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  attackspeedperlevel: number;

  @property({
    type: 'number',
    required: true,
  })
  attackspeed: number;

  constructor(data?: Partial<Champion>) {
    super(data);
  }
}
