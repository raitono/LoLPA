//3rd party imports
import test from 'ava';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as request from 'supertest';

// My imports
import { SummonerController } from './summoner.controller';

function makeApp() {
    const app:Koa = new Koa();

    const summonerRouter: Router = new Router({ prefix: '/summoners' });

    summonerRouter.get('/:name', SummonerController.getByName);
    summonerRouter.get('/', SummonerController.getAll);

    app.use(bodyParser());
    app.use(summonerRouter.routes());
    app.use(summonerRouter.allowedMethods());

    return app.listen();
}

test('ping', async t => {
    const res = await request(makeApp())
        .get('/summoners/ping');

    t.is(res.status, 200);
    t.is(res.body.msg, 'pong');
});