import Knex = require('knex');

exports.up = function(knex: Knex, Promise: Promise<any>): any {
  return knex.schema.createTable('test', (table) => {
      table.increments('id');
      table.string('test_value');
  }).then(() => {
    return knex.insert({test_value: 't'}).into('test');
  });
};

exports.down = function(knex: Knex, Promise: Promise<any>): any {
  return knex.schema.dropTableIfExists('test');
};
