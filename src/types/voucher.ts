export enum VoucherType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  BILLOFCOSTS = 'BILLOFCOSTS',
  IMPORT = 'IMPORT',
  OTHER = 'OTHER',
}

export enum VoucherStatus {
  RECEIVED = 'RECEIVED',
  CHECKED = 'CHECKED',
  APPROVED = 'APPROVED',
  DRAFT = 'DRAFT',
  BOOKED = 'BOOKED',
}

export enum VatCode {
  FREE = 'FREE',
  ZERO = 'ZERO',
  EXCLUDED = 'EXCLUDED',
  INCLUDED = 'INCLUDED',
  MARGINAL = 'MARGINAL',
}

export interface CreateVoucherEntryDto {
  date?: string;
  account: string;
  description?: string;
  amount: string;
  vatPercent?: string;
  vatCode?: VatCode;
  dimensions?: string[];
}

export interface CreateVoucherContraEntryDto {
  account: string;
  newBalanceItem?: boolean;
  archiveId?: string;
}

export interface CreateVoucherPartnerDto {
  name: string;
  registryCode?: string;
  iban?: string[];
}

export interface CreateVoucherDto {
  type: VoucherType;
  date: string;
  title?: string;
  status: VoucherStatus;
  entries: CreateVoucherEntryDto[];
  contraEntry?: CreateVoucherContraEntryDto;
  partner?: CreateVoucherPartnerDto;
  dimensions?: string[];
  note?: string;
  attention?: boolean;
  origin?: object;
}

export interface CreateVoucherResponseDto {
  id: string;
  data: object;
}

export interface AttachmentDto {
  fileName: string;
  content: Buffer;
}
