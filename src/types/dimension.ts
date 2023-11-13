import { LanguageString } from './language';

export enum DimensionType {
  DEFAULT = 'DEFAULT',
  UNKNOWN = 'UNKNOWN',
  CONSTCENTRE = 'CONSTCENTRE',
  PROJECT = 'PROJECT',
  MARKING = 'MARKING',
}

export interface Dimension {
  id: string;
  name: LanguageString;
  parentId?: string;
  type: DimensionType;
  startDate?: Date;
  endDate?: Date;
}
