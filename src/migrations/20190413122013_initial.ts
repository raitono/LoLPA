import Knex = require('knex');

exports.up = function(knex: Knex, Promise: Promise<any>): any {
  return knex.raw('').then(() => {
    return knex.schema.createTable('champions', (table) => {
        table.increments('id');
    })
  });
};

exports.down = function(knex: Knex, Promise: Promise<any>): any {
  
};
