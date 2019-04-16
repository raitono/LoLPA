// Global setup
require('dotenv').config();
const debug: any = require('debug')('app');

// Third party imports
import Knex = require('knex');
import { Model } from 'objection';

// My imports

// Database setup
const knex: Knex = Knex(require('../knexfile')[process.env.NODE_ENV]);
Model.knex(knex);

async function main(): Promise<any> {
  debug('Running!');
}

main()
  .catch((err) => { console.error(err); })
  .finally(() => { return knex.destroy() });
