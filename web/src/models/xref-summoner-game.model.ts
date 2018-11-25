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
    id: true,
  })
  gameId?: number;

  @property({
    type: 'number',
    id: true,
  })
  participantId?: number;

  constructor(data?: Partial<XrefSummonerGame>) {
    super(data);
  }
}
