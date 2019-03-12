import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ParticipantStat} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParticipantStatRepository extends DefaultCrudRepository<
  ParticipantStat,
  typeof ParticipantStat.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ParticipantStat, dataSource);
  }
}
