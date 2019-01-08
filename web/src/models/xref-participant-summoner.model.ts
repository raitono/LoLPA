import {Model, model, property} from '@loopback/repository';

@model({name: 'Xref_Participant_Summoner'})
export class XrefParticipantSummoner extends Model {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  participantId: number;

  @property({
    type: 'string',
    required: true,
  })
  summonerPUUID: string;

  constructor(data?: Partial<XrefParticipantSummoner>) {
    super(data);
  }
}
