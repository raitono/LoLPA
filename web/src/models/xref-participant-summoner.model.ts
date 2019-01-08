import {Entity, model, property} from '@loopback/repository';

@model()
export class XrefParticipantSummoner extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  summonerPUUID: string;

  @property({
    type: 'number',
    required: true,
  })
  participantId: number;

  constructor(data?: Partial<XrefParticipantSummoner>) {
    super(data);
  }
}
