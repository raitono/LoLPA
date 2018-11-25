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
  })
  participantId?: number;

  @property({
    type: 'number',
  })
  deltaTypeId?: number;

  @property({
    type: 'string',
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
