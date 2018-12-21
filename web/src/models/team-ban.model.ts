import {Entity, model, property} from '@loopback/repository';

@model()
export class TeamBan extends Entity {
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
  teamId?: number;

  @property({
    type: 'number',
    required: true,
  })
  championId: number;

  @property({
    type: 'number',
    id: true,
  })
  pickTurn?: number;

  constructor(data?: Partial<TeamBan>) {
    super(data);
  }
}
