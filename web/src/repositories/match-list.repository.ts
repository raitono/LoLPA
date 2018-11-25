import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {MatchList} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MatchListRepository extends DefaultCrudRepository<
  MatchList,
  typeof MatchList.prototype.summonerId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(MatchList, dataSource);
  }
}
