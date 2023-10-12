import { LanguageString } from './language';

export enum NotificationType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: LanguageString;
  text: LanguageString;
  category?: string;
  created: Date;
}
