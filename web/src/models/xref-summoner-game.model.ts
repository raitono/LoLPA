import {Entity, model, property} from '@loopback/repository';

@model()
export class XrefSummonerGame extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  summonerId?: number;

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

  constructor(data?: Partial<XrefSummonerGame>) {
    super(data);
  }
}
