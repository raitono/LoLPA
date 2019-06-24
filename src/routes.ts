import * as Router from 'koa-router';

import { SummonerController } from './controllers/summoner.controller';
import { AdminController } from './controllers/admin.controller';
const debug: any = require('debug')('lolpa:routes');

const adminRouter: Router = new Router({ prefix: '/admin' });
const apiRouter: Router = new Router({ prefix: '/api' });
const summonerRouter: Router = new Router({ prefix: '/summoners' });

const summonerController = new SummonerController();

adminRouter.get('/patch', AdminController.patch);

summonerRouter.get('/:name', async (ctx) => {
  await SummonerController.getByName(ctx, summonerController);
});
// summonerRouter.get('/', SummonerController.getAll);

apiRouter.use(
  summonerRouter.routes(),
  summonerRouter.allowedMethods(),
);

export { adminRouter, apiRouter };
