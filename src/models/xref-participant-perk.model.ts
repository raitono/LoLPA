import {Entity, model, property} from '@loopback/repository';

@model({name: 'Xref_Participant_Perk'})
export class XrefParticipantPerk extends Entity {
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
    type: 'string',
    required: true,
  })
  perkId?: string;

  @property({
    type: 'number',
    required: true,
  })
  varId?: number;

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
