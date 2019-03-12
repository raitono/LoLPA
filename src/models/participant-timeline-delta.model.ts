import {Entity, model, property} from '@loopback/repository';

@model({name: 'Participant_Timeline_Delta'})
export class ParticipantTimelineDelta extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
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
