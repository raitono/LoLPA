import {Entity, model, property} from '@loopback/repository';

@model({name: 'Match_List'})
export class MatchList extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  summonerPUUID?: string;

  @property({
    type: 'number',
    required: true,
  })
  gameId?: number;

  @property({
    type: 'number',
    required: true,
  })
  championId: number;

  @property({
    type: 'string',
    required: true,
  })
  lane: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  constructor(data?: Partial<MatchList>) {
    super(data);
  }
}
