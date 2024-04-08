import { LanguageString } from './language';
import { OfficeType } from './office';

export interface AddonCallInfo {
  user: {
    id: string;
    name: string;
    email: string;
    rights: string[];
  };
  organization: {
    id: string;
    name: string;
    businessId: string;
    trial: boolean;
  };
  office?: {
    id: string;
    name: string;
    type: OfficeType;
    businessId: string;
  };
  planId: number;
  trialPeriod: boolean;
  rights: string[];
}

export interface AddonListedDto {
  id: string;
  name: LanguageString;
  active: boolean;
  system: boolean;
}

export interface AddonInfoDto {
  id: string;
  name: LanguageString;
  url: string;
  rights: string[];
  callId: string;
}

export enum LogStatus {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface AddonLogWriteDto {
  bookId: string;
  status: LogStatus;
  message: string;
  data?: object;
}

export interface AddonLogDto {
  status: LogStatus;
  message: string;
  data?: object;
  timestamp: Date;
}

export interface AddonDataListItem {
  bookId: string;
  name: string;
  businessId?: string;
  keys: string[];
}
