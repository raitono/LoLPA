import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { ParticipantTimelineDelta } from '../models';
import { RiotDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ParticipantTimelineDeltaRepository extends DefaultCrudRepository<
  ParticipantTimelineDelta,
  typeof ParticipantTimelineDelta.prototype.id
  > {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ParticipantTimelineDelta, dataSource);
  }
}
