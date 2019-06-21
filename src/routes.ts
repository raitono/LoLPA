import * as Router from 'koa-router';

import { SummonerController } from './controllers/summoner.controller';
import { AdminController } from './controllers/admin.controller';

const adminRouter: Router = new Router({ prefix: '/admin' });
const apiRouter: Router = new Router({ prefix: '/api' });
const summonerRouter: Router = new Router({ prefix: '/summoners' });

adminRouter.get('/patch', AdminController.patch);

summonerRouter.get('/:name', SummonerController.getByName);
// summonerRouter.get('/', SummonerController.getAll);

apiRouter.use(
    summonerRouter.routes(),
    summonerRouter.allowedMethods(),
);

export { adminRouter, apiRouter };
