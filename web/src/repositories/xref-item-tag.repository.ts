import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefItemTag} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefItemTagRepository extends DefaultCrudRepository<
  XrefItemTag,
  typeof XrefItemTag.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefItemTag, dataSource);
  }
}
