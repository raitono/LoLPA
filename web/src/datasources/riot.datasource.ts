import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './riot.datasource.json';

export class RiotDataSource extends juggler.DataSource {
  static dataSourceName = 'riot';

  constructor(
    @inject('datasources.config.riot', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
