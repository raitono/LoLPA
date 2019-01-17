import {Entity, model, property} from '@loopback/repository';

@model()
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  itemId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  goldSellsFor: number;

  @property({
    type: 'number',
    required: true,
  })
  goldTotal: number;

  @property({
    type: 'number',
    required: true,
  })
  goldBase: number;

  @property({
    type: 'boolean',
    required: true,
  })
  purchasable: boolean;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  colloq: string;

  @property({
    type: 'string',
  })
  plaintext: string;

  @property({
    type: 'number',
    default: 1,
  })
  depth: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}
