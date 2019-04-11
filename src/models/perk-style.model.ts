import {Entity, model, property} from '@loopback/repository';

@model({name: 'Perk_Style'})
export class PerkStyle extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  styleId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<PerkStyle>) {
    super(data);
  }
}
