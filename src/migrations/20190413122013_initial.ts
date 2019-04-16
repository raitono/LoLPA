require('dotenv').config();
import Knex = require('knex');
import * as fs from 'fs';
import * as util from 'util';
import mysql = require('mysql2');

const readFile = util.promisify(fs.readFile);

const debug: any = require('debug')('migrate_initial');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'riot',
  multipleStatements: true
});

exports.up = async function(knex: Knex, upPromise: Promise<any>): Promise<any> {
  const sql = await readFile('./scripts/server_init.sql', 'utf8');

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

exports.down = async function(knex: Knex, downPromise: Promise<any>): Promise<any> {
  const sql = await readFile('./scripts/server_create.sql', 'utf8');

  return new Promise((resolve,reject) => {
    con.query(sql,(err, results) => {
      if(err){
        debug(err);
        reject(err);
      }
      else{
        resolve();
      }
    });
  });
};
