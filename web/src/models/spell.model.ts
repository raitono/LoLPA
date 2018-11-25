import {Entity, model, property} from '@loopback/repository';

@model()
export class Spell extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  spellId?: number;

  @property({
    type: 'string',
    default: null,
  })
  version?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  constructor(data?: Partial<Spell>) {
    super(data);
  }
}
