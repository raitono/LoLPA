import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ItemTag} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemTagRepository extends DefaultCrudRepository<
  ItemTag,
  typeof ItemTag.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ItemTag, dataSource);
  }
}
