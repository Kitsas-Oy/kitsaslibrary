import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import {
  Account,
  AttachmentDto,
  CreateVoucherDto,
  CreateVoucherResponseDto,
  Dimension,
  FiscalYear,
} from '../types';
import { CreateInvoiceResponseDto, InvoiceDto } from '../types/invoice';
import { Product } from '../types/product';
import { TransactionEntryDto } from '../types/transactions';

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

  getConnection(): KitsasConnection {
    return this.connection;
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

  async getDimensions(): Promise<Dimension[]> {
    const { data } = await axios.get<Dimension[]>(
      '/v1/dimensions',
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
  ): Promise<CreateVoucherResponseDto> {
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
    return data;
  }

  async saveInvoice(
    invoice: InvoiceDto,
    attachments: AttachmentDto[]
  ): Promise<CreateInvoiceResponseDto> {
    const form = new FormData();
    form.append('invoice', JSON.stringify(invoice));
    for (const attachment of attachments) {
      form.append('attachments', attachment.content, attachment.fileName);
    }
    const { data } = await axios.post<CreateInvoiceResponseDto>(
      '/v1/invoices',
      form,
      await this.getConfig()
    );
    return data;
  }

  async saveTransactions(
    iban: string,
    startDate: Date,
    endDate: Date,
    entries: TransactionEntryDto[],
    original?: object,
    attachments?: AttachmentDto[]
  ): Promise<CreateVoucherResponseDto> {
    const form = new FormData();
    const payload = {
      iban,
      startDate,
      endDate,
      entries,
      original,
    };
    form.append('data', JSON.stringify(payload));
    for (const entry of entries) {
      form.append('entries', JSON.stringify(entry));
    }

    for (const attachment of attachments || []) {
      form.append('attachments', attachment.content, attachment.fileName);
    }
    const { data } = await axios.post<CreateVoucherResponseDto>(
      '/v1/transactions',
      form,
      await this.getConfig()
    );
    return data;
  }

  async getProducts(): Promise<Product[]> {
    const { data } = await axios.get<Product[]>(
      '/v1/products',
      await this.getConfig()
    );
    return data;
  }
}
