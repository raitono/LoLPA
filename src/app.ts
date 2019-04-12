// Global setup
require('dotenv').config();
const debug: any = require('debug')('app');

// Third party imports
import Knex = require('knex');
import { Model } from 'objection';

// My imports
import { Test } from './models/test';

// Database setup
const knex: Knex = Knex(require('../knexfile')[process.env.NODE_ENV]);
Model.knex(knex);

async function main(): Promise<any> {
  debug('Running!');
  await Test.query().insert({test_value: 'h'});
}

main()
  .then(() => knex.destroy())
  .catch(err => {
    console.error(err);
    return knex.destroy();
  });
