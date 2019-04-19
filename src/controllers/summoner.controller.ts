import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Summoner } from '../models/summoner';

const routerOpts: Router.IRouterOptions = { prefix: '/summoners' };
const router: Router = new Router(routerOpts);

router.get('/ping', async (ctx:Router.RouterContext) => {
  ctx.body = {
    msg: 'pong'
  };
});

router.get('/:name', async (ctx:Router.RouterContext) => {
  const sum = await Summoner.query().alias('s')
    .where({ name: ctx.params['name'] });

  if(sum[0])
    ctx.body = sum[0];
  else
    ctx.status = 404;
});

router.get('/', async (ctx:Router.RouterContext) => {
  ctx.body = await Summoner.query();
});

export default router;
