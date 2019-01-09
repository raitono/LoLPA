import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Summoner } from '../models';
import { RiotDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class SummonerRepository extends DefaultCrudRepository<
  Summoner,
  typeof Summoner.prototype.summonerId
  > {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Summoner, dataSource);
  }
}
