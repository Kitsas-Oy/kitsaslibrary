import { LanguageString } from './language';

export interface AddonCallInfo {
  user: {
    id: string;
    name: string;
  };
  organization: {
    id: string;
    name: string;
  };
  rights: string[];
}

export interface AddonListedDto {
  id: string;
  name: LanguageString;
  active: boolean;
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
