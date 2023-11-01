import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { KitsasConnectionInterface } from '../interfaces';
import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import {
  AddonCallInfo,
  AddonInfoDto,
  AddonListedDto,
  AddonLogDto,
  KitsasConnectionOptions,
  LanguageString,
  LogStatus,
  Notification,
  NotificationType,
} from '../types';
import { AuthResponse } from '../types/authresponse';
import * as Responses from '../types/authresponse';
import { AddBookResponse, BookListItem } from '../types/books';
import * as Exceptions from '../types/kitsasexeptions';
import { Office, OfficeInList, OfficeUser } from '../types/office';
import { PermissionPatch, Right } from '../types/rights';

import { KitsasBook } from './kitsasbook';
import { KitsasOffice } from './kitsasoffice';

export class KitsasConnection implements KitsasConnectionInterface {
  constructor(options: KitsasConnectionOptions, response: AuthResponse) {
    this.options = options;
    this.token = response.access_token;
    this.expiresAt = Date.now() / 1000 + response.expires_in;
    this.name = response.name;
  }

  private options: KitsasConnectionOptions;
  private token: string;
  private expiresAt: number;
  private name: string;

  static async login(options: KitsasConnectionOptions) {
    const payload = {
      username: options.username,
      password: options.password,
      code: options.code,
    };

    const config: AxiosRequestConfig = {
      baseURL: options.url,
      headers: {
        'User-Agent': options.agent,
        Authorization: options.token && 'Bearer ' + options.token,
      },
    };

    try {
      const { data } = await (options.token
        ? axios.get<AuthResponse>('/v1/login', config)
        : axios.post<AuthResponse>('/v1/login', payload, config));
      delete options.token;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<Responses.ErrorResponse>;
        if (axiosError.response?.data?.message === 'Invalid credentials') {
          throw new Exceptions.InvalidCredentialsError();
        } else if (axiosError.response?.data?.message === '2FA required') {
          throw new Exceptions.TFARequiredError();
        } else {
          throw new Exceptions.NetworkError(
            axiosError.response?.data?.message || axiosError.message
          );
        }
      } else {
        throw error;
      }
    }
  }

  async getConfig(): Promise<AxiosRequestConfig> {
    if (Date.now() / 1000 + 30 > this.expiresAt) {
      await this.refresh();
    }
    const config: AxiosRequestConfig = {
      baseURL: this.options.url,
      headers: {
        'User-Agent': this.options.agent,
        Authorization: 'Bearer ' + this.token,
      },
    };
    return config;
  }

  async refresh(): Promise<void> {
    if (Date.now() / 1000 + 30 < this.expiresAt) {
      this.options.token = this.token;
    } else if (!this.options.username || !this.options.password) {
      throw new Exceptions.RefreshExpiredError();
    }
    const response = await KitsasConnection.login(this.options);
    this.token = response.access_token;
    this.expiresAt = Date.now() / 1000 + response.expires_in;
  }

  getName(): string {
    return this.name;
  }

  getBaseURL(): string {
    return this.options.url ?? 'https://api.kitsas.fi';
  }

  getAgent(): string | undefined {
    return this.options.agent;
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

  async getBook(bookId: string): Promise<KitsasBookInterface> {
    const { data } = await axios.get<AuthResponse>(
      '/v1/login/' + bookId,
      await this.getConfig()
    );
    return new KitsasBook(this, data.access_token, bookId);
  }

  async addBook(
    bookshelfId: string,
    name: string,
    businessId?: string,
    trial?: boolean,
    backend?: string,
    planId?: number
  ): Promise<AddBookResponse> {
    const payload = {
      name,
      businessId,
      location: bookshelfId,
      trial,
      backend,
      planId,
    };
    const { data } = await axios.post<AddBookResponse>(
      `/v1/books/`,
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

  async getAddonList(target: string): Promise<AddonListedDto[]> {
    const { data } = await axios.get<AddonListedDto[]>(
      `/v1/addons/?target=${target}`,
      await this.getConfig()
    );
    return data;
  }

  async getAddonInfo(addonId: string, target: string): Promise<AddonInfoDto> {
    const { data } = await axios.get<AddonInfoDto>(
      `/v1/addons/${addonId}?target=${target}`,
      await this.getConfig()
    );
    return data;
  }

  async getAddonCallInfo(callId: string): Promise<AddonCallInfo> {
    const { data } = await axios.get<AddonCallInfo>(
      `/v1/addons/call/${callId}`,
      await this.getConfig()
    );
    return data;
  }

  async writeAddonLog(
    bookId: string,
    status: LogStatus,
    message: string,
    data?: object | undefined
  ): Promise<void> {
    const payload = {
      bookId,
      status,
      message,
      data,
    };
    await axios.post('/v1/addons/log', payload, await this.getConfig());
  }

  async getAddonLog(bookId: string, addonId?: string): Promise<AddonLogDto[]> {
    const { data } = await axios.get<AddonLogDto[]>(
      `/v1/addons/log/?bookId=${bookId}` +
        (addonId ? ` &addonId=${addonId}` : ''),
      await this.getConfig()
    );
    return data;
  }

  async saveData(bookId: string, key: string, data: object): Promise<void> {
    await axios.put(
      `/v1/addons/data/${bookId}/${key}`,
      data,
      await this.getConfig()
    );
  }

  async getData(bookId: string, key: string): Promise<object> {
    const { data } = await axios.get<object>(
      `/v1/addons/data/${bookId}/${key}`,
      await this.getConfig()
    );
    return data;
  }

  async addNotification(
    bookId: string,
    type: NotificationType,
    title: LanguageString,
    text: LanguageString,
    category?: string | undefined
  ): Promise<void> {
    const payload = {
      bookId,
      type,
      title,
      text,
      category,
    };
    await axios.post('/v1/notifications', payload, await this.getConfig());
  }

  async replaceNotification(
    bookId: string,
    type: NotificationType,
    title: LanguageString,
    text: LanguageString,
    category: string
  ): Promise<void> {
    const payload = {
      bookId,
      type,
      title,
      text,
      category,
    };
    await axios.patch('/v1/notifications', payload, await this.getConfig());
  }

  async getNotifications(
    bookId: string,
    addonId?: string
  ): Promise<Notification[]> {
    const { data } = await axios.get<Notification[]>(
      `/v1/notifications?bookId=${bookId}` +
        (addonId ? `&addonId=${addonId}` : ''),
      await this.getConfig()
    );
    return data;
  }
}
