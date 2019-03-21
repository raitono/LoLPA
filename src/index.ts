import {LoLPAApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import dotenv = require('dotenv-safe');
export {LoLPAApplication};

export async function main(options: ApplicationConfig = {}) {
    dotenv.config();
    const app = new LoLPAApplication(options);
    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    
    return app;
}
