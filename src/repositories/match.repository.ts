import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Match} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.gameId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Match, dataSource);
  }
}
