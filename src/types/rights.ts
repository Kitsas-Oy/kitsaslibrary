import { LanguageString } from './language';

export interface Right {
  rgt: string;
  name: LanguageString;
  rgtPath: string;
}

export interface PermissionPatch {
  owner: string;
  target: string;
  rights: string[];
  roles: string[];
  startDate?: Date;
  endDate?: Date;
}
