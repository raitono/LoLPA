import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Summoner } from '../models/summoner';

const routerOpts: Router.IRouterOptions = {
  prefix: '/summoners',
};

const router: Router = new Router(routerOpts);

router.get('/ping', async (ctx:Koa.Context) => {
  ctx.body = {
    msg: 'pong'
  };
});

router.get('/', async (ctx:Koa.Context) => {
  ctx.body = 'GET ALL';
});

export default router;
