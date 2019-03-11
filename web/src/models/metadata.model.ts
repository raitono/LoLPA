import {Entity, model, property} from '@loopback/repository';

@model()
export class Metadata extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  value: string;


  constructor(data?: Partial<Metadata>) {
    super(data);
  }
}
