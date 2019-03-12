import {Entity, model, property} from '@loopback/repository';

@model()
export class Summoner extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
  })
  puuid?: string;

  @property({
    type: 'string',
    required: true,
  })
  summonerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId?: string;

  @property({
    type: 'number',
    required: true,
  })
  profileIconId: number;

  @property({
    type: 'number',
    required: true,
  })
  summonerLevel: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  revisionDate: string;

  @property({
    type: 'date',
    default: null,
  })
  lastUpdated?: string;

  constructor(data?: Partial<Summoner>) {
    super(data);
  }
}
