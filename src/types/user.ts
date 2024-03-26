export enum UserMode {
  NORMAL = 'NORMAL',
  PRO = 'PRO',
  APIKEY = 'APIKEY',
  ADDON = 'ADDON',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  WEBUSER = 'WEBUSER',
  DUMMY = 'DUMMY',
  AUDITOR = 'AUDITOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  UNPAID = 'UNPAID',
  RULES = 'RULES',
  BLOCKED_BY_USER = 'USER',
  BLOCKED = 'BLOCKED',
  INVITED = 'INVITED',
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  mode: UserMode;
  status?: UserStatus;
}
