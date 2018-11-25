import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefParticipantPerk} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefParticipantPerkRepository extends DefaultCrudRepository<
  XrefParticipantPerk,
  typeof XrefParticipantPerk.prototype.gameId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefParticipantPerk, dataSource);
  }
}
