//3rd party imports
import test from 'ava';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as request from 'supertest';

// My imports
import summonerController from './summoner.controller';

function makeApp() {
    const app:Koa = new Koa();

    app.use(bodyParser());
    app.use(summonerController.routes());
    app.use(summonerController.allowedMethods());

    return app.listen(3001);
}

test('ping', async t => {
    t.plan(2);

    const res = await request(makeApp())
        .get('/summoners/ping');

    t.is(res.status, 200);
    t.is(res.body.msg, 'pong');
});