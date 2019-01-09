import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Champion} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChampionRepository extends DefaultCrudRepository<
  Champion,
  typeof Champion.prototype.championId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Champion, dataSource);
  }
}
