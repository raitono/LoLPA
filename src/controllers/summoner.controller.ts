import * as Router from 'koa-router';
import axios, { AxiosRequestConfig } from 'axios';
import { CircuitBreaker } from '../util/CircuitBreaker';
const debug: any = require('debug')('lolpa:summoner.controller');
import * as url from 'url';
import * as crypto from 'crypto';
import { ServiceModel } from '../models/service.model';

const circuitBreaker = new CircuitBreaker();

export class SummonerController {
  cache:{[key: string]: string};

  constructor() {
    this.cache = {};
  }

  static async getByName(ctx:Router.RouterContext, cnt:SummonerController): Promise<void> {
    const { ip, port } = await cnt.getService(process.env.SUMMONER_SERVICE_VERSION);

    ctx.body = (await cnt.callService({
      method: 'get',
      url: `http://${ip}:${port}/v4/summoner/${ctx.params['name']}`,
    }));
  }
  async getService(version: string): Promise<ServiceModel> {
    return <ServiceModel>(await axios.get(
      `${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}`
      + `/service/find/summoner-service/${version}`)).data;
  }
  async callService(options:AxiosRequestConfig): Promise<string> {
    const servicePath = url.parse(options.url).path;
    const cacheKey = crypto.createHash('md5').update(options.method + servicePath.toLowerCase())
      .digest('hex');
    const result = await circuitBreaker.callService(options);

    if (!result) {
      if (this.cache[cacheKey]) return this.cache[cacheKey];
      return '{status: \'error\'}';
    }

    this.cache[cacheKey] = result;
    return result;
  }
}
