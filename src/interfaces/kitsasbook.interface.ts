import { Account, AttachmentDto, CreateVoucherDto, FiscalYear } from '../types';

export interface KitsasBookInterface {
  getBookId(): string;

  getAccounts(): Promise<Account[]>;
  getFiscalYears(): Promise<FiscalYear[]>;

  saveVoucher(
    voucher: CreateVoucherDto,
    attachments: AttachmentDto[]
  ): Promise<string>;
}
