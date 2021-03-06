import {Entity, model, property} from '@loopback/repository';

@model()
export class Participant extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  gameId?: number;

  @property({
    type: 'number',
    required: true,
  })
  participantId?: number;

  @property({
    type: 'string',
    required: true,
  })
  accountId?: string;

  @property({
    type: 'number',
    required: true,
  })
  championId: number;

  @property({
    type: 'number',
    required: true,
  })
  spell1Id: number;

  @property({
    type: 'number',
    required: true,
  })
  spell2Id: number;

  @property({
    type: 'number',
    required: true,
  })
  teamId: number;

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
    type: 'string',
    required: false,
    default: 'UNRANKED'
  })
  highestAchievedSeasonTier: string;

  constructor(data?: Partial<Participant>) {
    super(data);
  }
}
