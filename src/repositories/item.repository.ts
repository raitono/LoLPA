import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Item} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.itemId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Item, dataSource);
  }
}
