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
  /**
   * Bookshelf id
   */
  id: string;
  /**
   * Bookshelf name
   */
  name: string;
  /**
   * Current user's effective rights in this bookshelf
   */
  rights: string[];
  /**
   * Bookshelf inside this bookshelf
   */
  subgroups: Bookshelf[];
}

export interface PermissionRole {
  id: string;
  name: LanguageString;
}

export interface PermissionUserTarget {
  id: string;
  name: string;
  type: string;
  rights: string[];
  roles: PermissionRole[];
  startDate?: string;
  endDate?: string;
}

export interface PermissionUser {
  id: string;
  name: string;
  email?: string;
  targets: PermissionUserTarget[];
}

export interface OfficeCustomization {
  primaryColor?: string;
  secondaryColor?: string;
  topBarLogo?: string;
  fullLogo?: string;
}

export enum OfficeType {
  KITSASPRO = 'KITSASPRO',
  TALOUSVERKKO = 'TALOUSVERKKO',
  KITSAS = 'KITSAS',
  FREE = 'FREE',
}

export interface OfficeContactPerson {
  name: string;
  email: string;
  phone?: string;
}

export interface Office {
  id: string;
  name: string;
  created: Date;
  businessId?: string;
  officeType?: OfficeType;
  roles: OfficeRole[];
  bookshelves: Bookshelf[];
  certificate: CertificateInformation;
  customization?: OfficeCustomization;
  contactPersons?: OfficeContactPerson[];
}
