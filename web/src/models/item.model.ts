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
    type: 'string',
    required: true,
  })
  version: string;

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
    default: null,
  })
  description?: string;

  @property({
    type: 'string',
    default: null,
  })
  colloq?: string;

  @property({
    type: 'string',
    default: null,
  })
  plaintext?: string;

  @property({
    type: 'number',
    default: 1,
  })
  depth: number;

  @property({
    type: 'string',
    default: null,
  })
  from?: string;

  @property({
    type: 'string',
    default: null,
  })
  into?: string;

  @property({
    type: 'boolean',
    default: null,
  })
  hideFromAll?: boolean;

  @property({
    type: 'string',
    default: null,
  })
  requiredAlly?: string;

  @property({
    type: 'string',
    default: null,
  })
  requiredChampion?: string;

  @property({
    type: 'number',
    default: null,
  })
  specialRecipe?: number;

  @property({
    type: 'number',
    default: null,
  })
  stacks?: number;

  @property({
    type: 'boolean',
    default: null,
  })
  inStore?: boolean;

  @property({
    type: 'boolean',
    default: null,
  })
  consumed?: boolean;

  @property({
    type: 'boolean',
    default: null,
  })
  consumeOnFull?: boolean;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}
