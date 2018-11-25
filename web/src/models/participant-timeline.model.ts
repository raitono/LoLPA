import {Entity, model, property} from '@loopback/repository';

@model()
export class ParticipantTimeline extends Entity {
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
    type: 'string',
    required: true,
  })
  lane: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  constructor(data?: Partial<ParticipantTimeline>) {
    super(data);
  }
}
