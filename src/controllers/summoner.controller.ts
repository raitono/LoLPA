import * as Router from 'koa-router';
import axios, { AxiosRequestConfig } from 'axios';
const debug: any = require('debug')('lolpa:summoner.controller');

export class SummonerController {
  static async getByName(ctx:Router.RouterContext) {
    const { ip, port } = await SummonerController.getService(process.env.SUMMONER_SERVICE_VERSION);

    ctx.body = (await SummonerController.callService({
      method: 'get',
      url: `http://${ip}:${port}/v4/summoner/${ctx.params['name']}`,
    }));
  }
  static async callService(options:AxiosRequestConfig) {
    return (await axios(options)).data;
  }
  static async getService(version:String) {
    return (await axios.get(`${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}`
    + `/service/find/summoner-service/${version}`)).data;
  }
}
