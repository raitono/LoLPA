import {Entity, model, property} from '@loopback/repository';

@model()
export class Participant extends Entity {
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
  highestAchievedSeasonTier: string;

  constructor(data?: Partial<Participant>) {
    super(data);
  }
}
