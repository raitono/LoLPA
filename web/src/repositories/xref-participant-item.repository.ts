import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefParticipantItem} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefParticipantItemRepository extends DefaultCrudRepository<
  XrefParticipantItem,
  typeof XrefParticipantItem.prototype.gameId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefParticipantItem, dataSource);
  }
}
