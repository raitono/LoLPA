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
    id: true,
  })
  participantId?: number;

  @property({
    type: 'string',
    id: true,
  })
  perkId?: string;

  @property({
    type: 'number',
    id: true,
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
