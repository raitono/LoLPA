import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { ParticipantTimeline } from '../models';
import { RiotDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ParticipantTimelineRepository extends DefaultCrudRepository<
  ParticipantTimeline,
  typeof ParticipantTimeline.prototype.id
  > {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(ParticipantTimeline, dataSource);
  }
}
