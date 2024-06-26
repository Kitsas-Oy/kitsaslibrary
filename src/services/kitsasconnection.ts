import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { KitsasConnectionInterface } from '../interfaces';
import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import {
  AddonCallInfo,
  AddonDataListItem,
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
import {
  AddBookResponse,
  BookListItem,
  BookOpenCountItem,
  OrganizationStatusResponse,
} from '../types/books';
import * as Exceptions from '../types/kitsasexeptions';
import { Office, OfficeInList, PermissionUser } from '../types/office';
import { PermissionPatch, Right } from '../types/rights';
import { UserListItem } from '../types/user';

import { KitsasBook } from './kitsasbook';
import { KitsasOffice } from './kitsasoffice';

interface KitsasConnectionError {
  message: string;
  errorCode?: number;
  request2fa?: string;
}

export class KitsasConnection implements KitsasConnectionInterface {
  constructor(options: KitsasConnectionOptions, response: AuthResponse) {
    this.options = options;
    this.token = response.access_token;
    this.expiresAt = Date.now() / 1000 + response.expires_in;
    this.name = response.name;
    this.userUuid = response.id;
  }

  private options: KitsasConnectionOptions;
  private token: string;
  private expiresAt: number;
  private name: string;
  private userUuid: string;

  static async login(options: KitsasConnectionOptions) {
    const payload = {
      username: options.username,
      password: options.password,
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
        const errorData = axiosError.response?.data as KitsasConnectionError;
        if (errorData?.message === 'Invalid credentials') {
          throw new Exceptions.InvalidCredentialsError();
        } else if (
          errorData?.message === '2FA required' &&
          errorData?.request2fa
        ) {
          throw new Exceptions.TFARequiredError(errorData?.request2fa);
        } else {
          throw new Exceptions.NetworkError(
            errorData?.message || axiosError.message
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

  getUserId(): string {
    return this.userUuid;
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

  async getBooks(): Promise<BookListItem[]> {
    const { data } = await axios.get<BookListItem[]>(
      '/v1/books',
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

  async deleteBook(bookId: string): Promise<void> {
    await axios.delete(`/v1/books/${bookId}`, await this.getConfig());
  }

  async getPermissions(target: string): Promise<PermissionUser[]> {
    const { data } = await axios.get<PermissionUser[]>(
      '/v1/permissions?target=' + target,
      await this.getConfig()
    );
    return data;
  }

  async setPermissions(permissions: PermissionPatch[]): Promise<void> {
    await axios.patch('/v1/permissions', permissions, await this.getConfig());
  }

  async listRights(target?: string): Promise<Right[]> {
    const { data } = await axios.get<Right[]>(
      '/v1/permissions/rights' + (target ? `?target=${target}` : ''),
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
    const { data } = await axios.get(
      `/v1/addons/data/${bookId}/${key}`,
      await this.getConfig()
    );
    return data;
  }

  async listData(): Promise<AddonDataListItem[]> {
    const { data } = await axios.get<AddonDataListItem[]>(
      `/v1/addons/data/`,
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

  async deleteNotification(id: string): Promise<void> {
    await axios.delete(`/v1/notifications/${id}`, await this.getConfig());
  }

  async deleteNotifications(
    bookId: string,
    category?: string | undefined
  ): Promise<void> {
    await axios.delete(
      `/v1/notifications?bookId=${bookId}` +
        (category ? `&category=${category}` : ''),
      await this.getConfig()
    );
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

  async getOrganizationStatus(
    businessId: string
  ): Promise<OrganizationStatusResponse> {
    const { data } = await axios.get<OrganizationStatusResponse>(
      `/v1/books/status/${businessId}`,
      await this.getConfig()
    );
    return data;
  }

  async findUserByEmail(email: string): Promise<UserListItem | undefined> {
    const params = new URLSearchParams({ email });
    const { data } = await axios.get<UserListItem[]>(
      `/v1/users?${params.toString()}`,
      await this.getConfig()
    );
    if (data.length === 0) {
      return undefined;
    } else {
      return data[0];
    }
  }

  async getBookOpenCounts(bookId: string): Promise<BookOpenCountItem[]> {
    const { data } = await axios.get<BookOpenCountItem[]>(
      `/v1/books/${bookId}/logcounts`,
      await this.getConfig()
    );
    return data;
  }
}
