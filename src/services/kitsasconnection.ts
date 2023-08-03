import { ApisauceInstance, create } from 'apisauce';

import { AuthResponse } from '../types/authresponse';

export class KitsasConnection {
  constructor(baseapi: string, agent: string, response: AuthResponse) {
    //    this.baseapi = baseapi;
    //    this.agent = agent;
    this.token = response.access_token;
    this.name = response.name;
    this.api = create({
      baseURL: baseapi,
      headers: {
        'User-Agent': agent,
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  /**
   * Get current user's name
   * @returns User's name
   */
  getName(): string {
    return this.name;
  }

  getApi(): ApisauceInstance {
    return this.api;
  }

  private token: string;
  private name: string;

  private api: ApisauceInstance;
}
