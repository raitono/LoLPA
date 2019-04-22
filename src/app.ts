// Global setup
require('dotenv').config();
const debug: any = require('debug')('lolpa:app');

// Third party imports
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import Knex = require('knex');
import { Model } from 'objection';
import * as Koa from 'koa';
const app:Koa = new Koa();

// My imports
import { apiRouter } from './routes'

// Database setup
const knex: Knex = Knex(require('../knexfile')[process.env.NODE_ENV]);
Model.knex(knex);

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(bodyParser());
app.use(json());

//Route middleware
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.use(async (ctx:Koa.Context) => (ctx.body = {msg: 'Hello Koa!'}));

// Application error logging.
app.on('error', console.error);

export default app;
