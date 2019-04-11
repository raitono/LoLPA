import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { TeamStat } from '../models';
import { RiotDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TeamStatRepository extends DefaultCrudRepository<
  TeamStat,
  typeof TeamStat.prototype.id
  > {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(TeamStat, dataSource);
  }
}
