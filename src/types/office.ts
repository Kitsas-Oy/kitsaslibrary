export interface OfficeList {
  id: string;
  name: string;
  businessId?: string;
}

interface OfficeRole {
  id: string;
  name: {
    fi: string;
    sv?: string;
    en?: string;
  };
  rights: string[];
}

interface OfficeBookshelf {
  id: string;
  name: string;
  path: string;
}

export interface Office {
  id: string;
  name: string;
  created: Date;
  businessId?: string;
  officeType?: string;
  roles?: OfficeRole[];
  bookshelves?: OfficeBookshelf[];
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
