import * as Koa from 'koa';
import * as Router from 'koa-router';

import { SummonerService } from '../services/summoner.service'

export class SummonerController {
  static async getByName(ctx:Router.RouterContext) {
    const sum = await SummonerService.getByName(ctx.params['name']);
  
    if(sum)
      ctx.body = sum;
    else
      ctx.status = 404;
  };

  static async getAll(ctx:Router.RouterContext) {
    ctx.body = await SummonerService.getAll();
  };
}
