import {Entity, model, property} from '@loopback/repository';

@model({name: 'Item_Tag'})
export class ItemTag extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name?: string;


  constructor(data?: Partial<ItemTag>) {
    super(data);
  }
}
