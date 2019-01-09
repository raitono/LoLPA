import {Entity, model, property} from '@loopback/repository';

@model()
export class Season extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  seasonId?: number;

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'boolean',
    required: true,
    default: 0,
  })
  isCurrent: boolean;

  constructor(data?: Partial<Season>) {
    super(data);
  }
}
