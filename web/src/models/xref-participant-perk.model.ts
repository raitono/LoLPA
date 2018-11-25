import {Entity, model, property} from '@loopback/repository';

@model()
export class XrefParticipantPerk extends Entity {
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
  })
  perkId?: string;

  @property({
    type: 'number',
  })
  verId?: number;

  @property({
    type: 'string',
    default: null,
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  constructor(data?: Partial<XrefParticipantPerk>) {
    super(data);
  }
}
