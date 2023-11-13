import {
  Account,
  AttachmentDto,
  CreateVoucherDto,
  Dimension,
  FiscalYear,
} from '../types';

export interface KitsasBookInterface {
  getBookId(): string;

  getAccounts(): Promise<Account[]>;
  getDimensions(): Promise<Dimension[]>;
  getFiscalYears(): Promise<FiscalYear[]>;

  saveVoucher(
    voucher: CreateVoucherDto,
    attachments: AttachmentDto[]
  ): Promise<string>;
}
