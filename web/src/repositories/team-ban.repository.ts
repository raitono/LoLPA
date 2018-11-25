import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {TeamBan} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TeamBanRepository extends DefaultCrudRepository<
  TeamBan,
  typeof TeamBan.prototype.gameId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(TeamBan, dataSource);
  }
}
