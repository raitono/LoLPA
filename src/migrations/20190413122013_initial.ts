import Knex = require('knex');
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

exports.up = async function(knex: Knex, Promise: Promise<any>): Promise<any> {
  const sql = await readFile('./scripts/server_create.sql', 'utf8');
  return knex.raw(sql);
};

exports.down = async function(knex: Knex, Promise: Promise<any>): Promise<any> {
  return knex.raw('DROP DATABASE riot;');
};
