import * as Router from 'koa-router';
import axios, { AxiosRequestConfig } from 'axios';
import { CircuitBreaker } from '../util/CircuitBreaker';
const debug: any = require('debug')('lolpa:summoner.controller');
import * as url from 'url';
import * as crypto from 'crypto';

const circuitBreaker = new CircuitBreaker();

export class SummonerController {
  cache:any;

  constructor() {
    this.cache = {};
  }

  static async getByName(ctx:Router.RouterContext, cnt:SummonerController) {
    const { ip, port } = await cnt.getService(process.env.SUMMONER_SERVICE_VERSION);

    ctx.body = (await cnt.callService({
      method: 'get',
      url: `http://${ip}:${port}/v4/summoner/${ctx.params['name']}`,
    }));
  }
  async getService(version:String) {
    return (await axios.get(`${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}`
    + `/service/find/summoner-service/${version}`)).data;
  }
  async callService(options:AxiosRequestConfig) {
    const servicePath = url.parse(options.url).path;
    const cacheKey = crypto.createHash('md5').update(options.method + servicePath.toLowerCase())
      .digest('hex');
    const result = await circuitBreaker.callService(options);

    if (!result) {
      if (this.cache[cacheKey]) return this.cache[cacheKey];
      return false;
    }

    this.cache[cacheKey] = result;
    return result;
  }
}
