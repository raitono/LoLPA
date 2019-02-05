import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ItemStat} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemStatRepository extends DefaultCrudRepository<
  ItemStat,
  typeof ItemStat.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ItemStat, dataSource);
  }
}
