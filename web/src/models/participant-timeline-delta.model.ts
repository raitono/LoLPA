import {Entity, model, property} from '@loopback/repository';

@model()
export class ParticipantTimelineDelta extends Entity {
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
    id: true,
  })
  deltaTypeId?: number;

  @property({
    type: 'string',
    id: true,
  })
  increment?: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  constructor(data?: Partial<ParticipantTimelineDelta>) {
    super(data);
  }
}
