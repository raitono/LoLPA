import {Entity, model, property} from '@loopback/repository';

@model()
export class Champion extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  championId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  constructor(data?: Partial<Champion>) {
    super(data);
  }
}
