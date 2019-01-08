import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefParticipantSummoner} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefParticipantSummonerRepository extends DefaultCrudRepository<
  XrefParticipantSummoner,
  typeof XrefParticipantSummoner.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefParticipantSummoner, dataSource);
  }
}
