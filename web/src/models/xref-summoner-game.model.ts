import {Entity, model, property} from '@loopback/repository';

@model()
export class XrefSummonerGame extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  summonerId?: number;

  @property({
    type: 'number',
  })
  gameId?: number;

  @property({
    type: 'number',
  })
  participantId?: number;

  constructor(data?: Partial<XrefSummonerGame>) {
    super(data);
  }
}
