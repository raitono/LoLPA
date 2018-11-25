import {Entity, model, property} from '@loopback/repository';

@model()
export class Perk extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  perkId?: string;

  @property({
    type: 'string',
    required: true,
  })
  styleId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Perk>) {
    super(data);
  }
}
