import {Entity, model, property} from '@loopback/repository';

@model()
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  gameId?: number;

  @property({
    type: 'number',
    required: true,
  })
  seasonId: number;

  @property({
    type: 'number',
    required: true,
  })
  queueId: number;

  @property({
    type: 'number',
    required: true,
  })
  mapId: number;

  @property({
    type: 'string',
    required: true,
  })
  platformId: string;

  @property({
    type: 'string',
    required: true,
  })
  gameVersion: string;

  @property({
    type: 'string',
    required: true,
  })
  gameMode: string;

  @property({
    type: 'string',
    required: true,
  })
  gameType: string;

  @property({
    type: 'number',
    required: true,
  })
  gameDuration: number;

  @property({
    type: 'date',
    required: true,
  })
  gameCreation: string;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}
