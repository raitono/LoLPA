import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ChampionTag} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChampionTagRepository extends DefaultCrudRepository<
  ChampionTag,
  typeof ChampionTag.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ChampionTag, dataSource);
  }
}
