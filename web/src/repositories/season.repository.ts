import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Season} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SeasonRepository extends DefaultCrudRepository<
  Season,
  typeof Season.prototype.seasonId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Season, dataSource);
  }
}
