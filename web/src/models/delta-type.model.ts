import {Entity, model, property} from '@loopback/repository';

@model()
export class DeltaType extends Entity {
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

  constructor(data?: Partial<DeltaType>) {
    super(data);
  }
}
