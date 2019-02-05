import {Entity, model, property} from '@loopback/repository';

@model({name: 'Item_Stat'})
export class ItemStat extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  itemId: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'boolean',
    default: false,
  })
  exists: boolean;

  constructor(data?: Partial<ItemStat>) {
    super(data);
  }
}
