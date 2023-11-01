import { LanguageString } from './language';

export interface Account {
  number: string;
  name: LanguageString;
  typeCode: string;
  iban?: string;
}
