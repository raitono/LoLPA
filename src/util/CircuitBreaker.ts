import axios, { AxiosRequestConfig } from 'axios';
const debug: any = require('debug')('lolpa:circuit-breaker');

export class CircuitBreaker {
  states:{[key: string]: StateModel};
  failureThreshold: number;
  cooldownPeriod: number;
  requestTimeout: number;

  constructor() {
    this.states = {};
    this.failureThreshold = 5;
    this.cooldownPeriod = 10;
    this.requestTimeout = 1;
  }

  initState(endpoint:string): void {
    this.states[endpoint] = {
      failures: 0,
      cooldownPeriod: this.cooldownPeriod,
      circuit: 'CLOSED',
      nextTry: 0,
    };
  }

  onSuccess(endpoint:string): void {
    this.initState(endpoint);
  }

  onFailure(endpoint:string): void {
    const state = this.states[endpoint];
    state.failures += 1;

    if (state.failures > this.failureThreshold) {
      state.circuit = 'OPEN';
      state.nextTry = new Date().getTime() / 1000 + this.cooldownPeriod;
      debug(`Circuit for ${endpoint} is OPEN`);
    }
  }

  canRequest(endpoint:string): boolean {
    if (!this.states[endpoint]) this.initState(endpoint);
    const state = this.states[endpoint];
    if (state.circuit === 'CLOSED') return true;
    if (state.nextTry <= new Date().getTime() / 1000) {
      state.circuit = 'HALF';
      return true;
    }
    return false;
  }

  async callService(options:AxiosRequestConfig): Promise<string> {
    const endpoint = `${options.method}:${options.url}`;

    if (!this.canRequest(endpoint)) return '{status: \'error\'}';

    options.timeout = this.requestTimeout * 1000;

    try {
      const response = await axios(options);
      this.onSuccess(endpoint);
      return response.data;
    } catch (error) {
      this.onFailure(endpoint);
      return '{status: \'error\'}';
    }
  }
}

class StateModel {
  failures: number;
  cooldownPeriod: number;
  circuit: string;
  nextTry: number;
}
