import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefChampionTag} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefChampionTagRepository extends DefaultCrudRepository<
  XrefChampionTag,
  typeof XrefChampionTag.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefChampionTag, dataSource);
  }
}
