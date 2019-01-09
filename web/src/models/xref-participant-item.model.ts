import {Entity, model, property} from '@loopback/repository';

@model({name: 'Xref_Participant_Item'})
export class XrefParticipantItem extends Entity {
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
    type: 'number',
    required: true,
  })
  itemId: number;

  constructor(data?: Partial<XrefParticipantItem>) {
    super(data);
  }
}
