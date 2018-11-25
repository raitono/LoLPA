import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Participant} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParticipantRepository extends DefaultCrudRepository<
  Participant,
  typeof Participant.prototype.gameId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Participant, dataSource);
  }
}
