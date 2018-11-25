import {Entity, model, property} from '@loopback/repository';

@model()
export class XrefParticipantItem extends Entity {
  @property({
    type: 'number',
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
  itemId: number;

  constructor(data?: Partial<XrefParticipantItem>) {
    super(data);
  }
}
