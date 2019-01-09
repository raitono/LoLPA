import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Perk} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PerkRepository extends DefaultCrudRepository<
  Perk,
  typeof Perk.prototype.perkId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Perk, dataSource);
  }
}
