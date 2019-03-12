import {Entity, model, property} from '@loopback/repository';

@model({name: 'Xref_Item_Map'})
export class XrefItemMap extends Entity {
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
  mapId: number;

  @property({
    type: 'boolean',
    default: false,
  })
  enabled: boolean;

  constructor(data?: Partial<XrefItemMap>) {
    super(data);
  }
}
