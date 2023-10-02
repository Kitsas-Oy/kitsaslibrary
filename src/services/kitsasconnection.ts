import axios, { AxiosRequestConfig } from 'axios';

import { KitsasConnectionInterface } from '../interfaces';
import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import { AuthResponse } from '../types/authresponse';
import { AddBookResponse, BookListItem } from '../types/books';
import { Office, OfficeInList, OfficeUser } from '../types/office';
import { PermissionPatch, Right } from '../types/rights';

import { KitsasOffice } from './kitsasoffice';

export class KitsasConnection implements KitsasConnectionInterface {
  constructor(baseapi: string, agent: string, response: AuthResponse) {
    this.baseURL = baseapi;
    this.agent = agent;
    this.token = response.access_token;
    this.name = response.name;
  }

  private token: string;
  private baseURL: string;
  private agent: string;
  private name: string;

  async getConfig(): Promise<AxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      headers: {
        'User-Agent': this.agent,
        Authorization: 'Bearer ' + this.token,
      },
    };
    return config;
  }

  getName(): string {
    return this.name;
  }

  async getOffices(): Promise<OfficeInList[]> {
    const { data } = await axios.get<OfficeInList[]>(
      '/v1/offices',
      await this.getConfig()
    );
    return data;
  }

  async getOffice(id: string): Promise<KitsasOfficeInterface> {
    const { data } = await axios.get<Office>(
      `/v1/offices/${id}`,
      await this.getConfig()
    );
    return new KitsasOffice(data, this);
  }

  async getBooks(target?: string): Promise<BookListItem[]> {
    const { data } = await axios.get<BookListItem[]>(
      '/v1/books' + (target ? '?target=' + target : ''),
      await this.getConfig()
    );
    return data;
  }

  async addBook(
    bookshelfId: string,
    name: string,
    businessId?: string
  ): Promise<AddBookResponse> {
    const payload = {
      name,
      businessId,
      location: bookshelfId,
    };
    const { data } = await axios.post<AddBookResponse>(
      `/v1/books/${bookshelfId}`,
      payload,
      await this.getConfig()
    );
    return data;
  }

  async getPermissions(target: string): Promise<OfficeUser[]> {
    const { data } = await axios.get<OfficeUser[]>(
      '/v1/permissions?target=' + target,
      await this.getConfig()
    );
    return data;
  }

  async setPermissions(permissions: PermissionPatch[]): Promise<void> {
    await axios.patch('/v1/permissions', permissions, await this.getConfig());
  }

  async listRights(): Promise<Right[]> {
    const { data } = await axios.get<Right[]>(
      '/v1/permissions/rights',
      await this.getConfig()
    );
    return data;
  }
}
