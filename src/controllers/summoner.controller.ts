import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Summoner } from '../models/summoner';

export class SummonerController {
  static async getByName(ctx:Router.RouterContext) {
    const sum = await Summoner.query().alias('s')
      .where({ name: ctx.params['name'] });
  
    if(sum[0])
      ctx.body = sum[0];
    else
      ctx.status = 404;
  };

  static async getAll(ctx:Router.RouterContext) {
    ctx.body = await Summoner.query();
  };
}
