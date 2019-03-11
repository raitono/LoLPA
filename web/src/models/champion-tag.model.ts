import {Entity, model, property} from '@loopback/repository';

@model({name: 'Champion_Tag'})
export class ChampionTag extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<ChampionTag>) {
    super(data);
  }
}
