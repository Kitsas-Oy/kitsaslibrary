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

export enum RightEnum {
  OFFICE = 'O',
  OfficeView = 'OT',
  OfficeCreateBooks = 'OB',
  OfficeCertificates = 'OC',
  OfficeMoveBooks = 'OD',
  OfficeBookshelves = 'OG',
  OfficeRoles = 'OR',
  OfficeUsers = 'OU',
  OfficeLogs = 'OL',
  OfficePermissions = 'OP',
  OfficeAdminPermissions = 'OA',
  OfficeSupport = 'OS',
  ADMIN = 'A',
  AdminView = 'AT',
  AdminOffices = 'AO',
  AdminPermissions = 'AP',
  AdminInternal = 'AK',
  ACCOUNTING = 'R',
  DOCUMENTS = 'RT',
  Browse = 'Ts',
  Draft = 'Tl',
  Save = 'Tt',
  Comment = 'Tk',
  INVOICES = 'RL',
  InvoiceBrowse = 'Ls',
  InvoiceCreate = 'Ll',
  InvoiceSend = 'Lt',
  Products = 'Xt',
  Groups = 'Xr',
  CIRCLE = 'RK',
  CircleAdd = 'Kl',
  CircleCheck = 'Kt',
  CircleAccept = 'Kh',
  CircleBrowse = 'Ks',
  MarkToPay = 'Pm',
  PayList = 'Pl',
  Reports = 'Ra',
  OPERATIONS = 'RO',
  Vat = 'Av',
  Budget = 'Bm',
  CloseAccounts = 'Tp',
  BOOKADMIN = 'RA',
  Settings = 'As',
  BasicSettings = 'Ab',
  Permissions = 'Ko',
  AddonSettings = 'Ao',
  AddonOperation = 'Ad',
  Owner = 'Om',
  SALARY = 'SY',
  MandateInvoice = 'mi',
  MandateCertificate = 'mc',
  BankInterface = 'bi',
}
