import { CertificateStatusInformation as CertificateInformation } from './certificate';
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
  system: boolean;
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

export interface PermissionUserTarget {
  id: string;
  name: string;
  type: string;
  rights: string[];
  roles: string[];
}

export interface PermissionUser {
  id: string;
  name: string;
  email?: string;
  targets: PermissionUserTarget[];
}

export interface Office {
  id: string;
  name: string;
  created: Date;
  businessId?: string;
  officeType?: string;
  roles: OfficeRole[];
  bookshelves: Bookshelf[];
  certificate: CertificateInformation;
}
