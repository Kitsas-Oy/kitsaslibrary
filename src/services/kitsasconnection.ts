import { ApisauceInstance, create } from 'apisauce';

import { KitsasConnectionInterface } from '../interfaces';
import { AuthResponse } from '../types/authresponse';
import { BookList } from '../types/books';
import { Office, OfficeList, OfficeUser } from '../types/office';

export class KitsasConnection implements KitsasConnectionInterface {
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

  getName(): string {
    return this.name;
  }

  getApi(): ApisauceInstance {
    return this.api;
  }

  async getOffices(): Promise<OfficeList[]> {
    const response = await this.api.get('/v1/offices');
    if (response.ok) {
      return response.data as OfficeList[];
    } else {
      throw Error('Error getting offices');
    }
  }

  async getOffice(id: string): Promise<Office> {
    const response = await this.api.get('/v1/offices/' + id);
    if (response.ok) {
      return response.data as Office;
    } else {
      throw Error('Error getting office');
    }
  }

  async getBooks(target?: string): Promise<BookList[]> {
    const response = await this.api.get(
      '/v1/books' + (target ? '?target=' + target : '')
    );
    if (response.ok) {
      return response.data as BookList[];
    } else {
      throw Error('Error getting books');
    }
  }

  async getPermissions(target: string): Promise<OfficeUser[]> {
    const response = await this.api.get('/v1/permissions?target=' + target);
    if (response.ok) {
      return response.data as OfficeUser[];
    } else {
      throw Error('Error getting permissions');
    }
  }

  private token: string;
  private name: string;

  private api: ApisauceInstance;
}
