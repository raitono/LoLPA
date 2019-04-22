import * as Koa from 'koa';
import * as Router from 'koa-router';

import { SummonerController } from './controllers/summoner.controller';

const apiRouter: Router = new Router({ prefix: '/api' });
const summonerRouter: Router = new Router({ prefix: '/summoners' });

summonerRouter.get('/:name', SummonerController.getByName);
summonerRouter.get('/', SummonerController.getAll);



apiRouter.use(
    summonerRouter.routes(),
    summonerRouter.allowedMethods()
);

export { apiRouter };
