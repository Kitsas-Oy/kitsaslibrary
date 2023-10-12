import { LanguageString } from './language';

export interface OfficeInList {
  id: string;
  name: string;
  businessId?: string;
}

export interface OfficeRole {
  id: string;
  name: LanguageString;
  rights: string[];
}

export interface OfficeRoleAdd {
  rights: string[];
  name: LanguageString;
}

export interface Bookshelf {
  id: string;
  name: string;
  rights: string[];
  subgroups: Bookshelf[];
}

interface OfficeUserTarget {
  id: string;
  name: string;
  type: string;
  rights: string[];
  roles: string[];
}

export interface OfficeUser {
  id: string;
  name: string;
  targets: OfficeUserTarget[];
}

export interface Office {
  id: string;
  name: string;
  created: Date;
  businessId?: string;
  officeType?: string;
  roles: OfficeRole[];
  bookshelves: Bookshelf[];
}
