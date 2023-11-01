import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import {
  Account,
  AttachmentDto,
  CreateVoucherDto,
  CreateVoucherResponseDto,
  FiscalYear,
} from '../types';

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

  async getAccounts(): Promise<Account[]> {
    const { data } = await axios.get<Account[]>(
      '/v1/accounts',
      await this.getConfig()
    );
    return data;
  }

  async getFiscalYears(): Promise<FiscalYear[]> {
    const { data } = await axios.get<FiscalYear[]>(
      '/v1/fiscalyears',
      await this.getConfig()
    );
    return data;
  }

  async saveVoucher(
    voucher: CreateVoucherDto,
    attachments: AttachmentDto[]
  ): Promise<string> {
    const form = new FormData();
    form.append('voucher', JSON.stringify(voucher));
    for (const attachment of attachments) {
      form.append('attachments', attachment.content, attachment.fileName);
    }
    const { data } = await axios.post<CreateVoucherResponseDto>(
      '/v1/vouchers',
      form,
      await this.getConfig()
    );
    return data.id;
  }
}
