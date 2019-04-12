require('dotenv').config();
const debug: any = require('debug')('app');

import * as client from 'knex';
const Knex: client = client(require('../knexfile')[process.env.NODE_ENV]);

async function run(): Promise<any> {
  debug('Running!');
}

run();
