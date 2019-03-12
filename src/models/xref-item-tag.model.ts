import {Entity, model, property} from '@loopback/repository';

@model({name: 'Xref_Item_Tag'})
export class XrefItemTag extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  version: string;

  @property({
    type: 'number',
    required: true,
  })
  itemId: number;

  @property({
    type: 'number',
    required: true,
  })
  tagId: number;


  constructor(data?: Partial<XrefItemTag>) {
    super(data);
  }
}
