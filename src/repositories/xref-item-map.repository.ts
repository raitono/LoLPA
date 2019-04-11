import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefItemMap} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefItemMapRepository extends DefaultCrudRepository<
  XrefItemMap,
  typeof XrefItemMap.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefItemMap, dataSource);
  }
}
