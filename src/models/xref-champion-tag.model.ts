import {Entity, model, property} from '@loopback/repository';

@model({name: 'Xref_Champion_Tag'})
export class XrefChampionTag extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  championId: number;

  @property({
    type: 'number',
    required: true,
  })
  tagId: number;

  constructor(data?: Partial<XrefChampionTag>) {
    super(data);
  }
}
