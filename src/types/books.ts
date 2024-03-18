export enum VatStatus {
  VATFREE = 'VATFREE',
  CALCULATED = 'CALCULATED',
  REPORTED = 'REPORTED',
  RECEIVED = 'RECEIVED',
}

export enum BookCertificateStatus {
  OK = 'OK',
  NOVAT = 'NOVAT',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID = 'INVALID',
}

export enum Badge {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  SUCCESS = 'success',
  MARKED = 'marked',
  OUTBOX = 'outbox',
  DRAFTS = 'drafts',
  INBOX = 'inbox',
}

export interface BookListItem {
  id: string;
  name: string;
  businessId?: string;
  badges: Badge[];
  group: {
    id: string;
    name: string;
    type: string;
  };
  created: Date;
  modified?: Date;
  documentCount?: number;
  backend?: string;
  trial: boolean;
  initialized: Date;
  vat: {
    dueDate?: Date;
    returnedUntil?: Date;
    period?: number;
    status?: VatStatus;
  };
  planId?: number;
  cert?: BookCertificateStatus;
}

export interface AddBookResponse {
  id: string;
  name: string;
  businessId?: string;
}

export enum OrganizationStatus {
  FREE = 'FREE',
  ACTIVE = 'ACTIVE',
  INVALID = 'INVALID',
}

export interface OrganizationStatusResponse {
  businessId: string;
  status: OrganizationStatus;
  name?: string;
  companyForm?: string;
}

export interface BookOpenCountItem {
  id: string;
  name: string;
  last: Date;
  count: number;
}
