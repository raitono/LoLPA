import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Metadata} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MetadataRepository extends DefaultCrudRepository<
  Metadata,
  typeof Metadata.prototype.id
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Metadata, dataSource);
  }
}
