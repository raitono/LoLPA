import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {PerkStyle} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PerkStyleRepository extends DefaultCrudRepository<
  PerkStyle,
  typeof PerkStyle.prototype.styleId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(PerkStyle, dataSource);
  }
}
