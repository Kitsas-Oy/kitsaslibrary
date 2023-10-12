import axios, { AxiosRequestConfig } from 'axios';

import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import { FiscalYear } from '../types';

import { KitsasConnection } from './kitsasconnection';

export class KitsasBook implements KitsasBookInterface {
  constructor(connection: KitsasConnection, token: string, bookId: string) {
    this.connection = connection;
    this.token = token;
    this.bookId = bookId;
  }

  private connection: KitsasConnection;
  private token: string;
  private bookId: string;

  async getConfig(): Promise<AxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      baseURL: this.connection.getBaseURL(),
      headers: {
        'User-Agent': this.connection.getAgent(),
        Authorization: 'Bearer ' + this.token,
      },
    };
    return config;
  }

  getBookId(): string {
    return this.bookId;
  }

  async getFiscalYears(): Promise<FiscalYear[]> {
    const { data } = await axios.get<FiscalYear[]>(
      '/v1/fiscalyears',
      await this.getConfig()
    );
    return data;
  }
}
