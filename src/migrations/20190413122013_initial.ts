require('dotenv').config();
import Knex = require('knex');
import * as fs from 'fs';
import * as util from 'util';

import mysql = require('mysql2');
const readFile = util.promisify(fs.readFile);

exports.up = async function(knex: Knex, upPromise: Promise<any>): Promise<any> {
  const sql = await readFile('./scripts/server_create.sql', 'utf8');

  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'riot',
    multipleStatements: true
  });

  return new Promise((resolve,reject) => {
    con.query(sql,(err, results) => {
      if(err){
        reject(err);
      }
      else
        resolve();
    });
  });
};

exports.down = async function(knex: Knex, Promise: Promise<any>): Promise<any> {
  return knex.raw('DROP DATABASE riot;');
};
