export interface BookListItem {
  id: string;
  name: string;
  businessId?: string;
  badges: string[];
  group: {
    id: string;
    name: string;
    type: string;
  };
  created: Date;
  modified?: Date;
  documentCount?: number;
  backend?: string;
  vat: {
    dueDate?: Date;
    returnedUntil?: Date;
    period?: number;
  };
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
