import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {DeltaType} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DeltaTypeRepository extends DefaultCrudRepository<
  DeltaType,
  typeof DeltaType.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(DeltaType, dataSource);
  }
}
