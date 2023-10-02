export interface BookList {
  id: string;
  name: string;
  businessId?: string;
  group: {
    id: string;
    name: string;
    type: string;
  };
  created: Date;
  modified?: Date;
  documentCount?: number;
  backend?: string;
  vat: {
    dueDate?: Date;
    returnedUntil?: Date;
    period?: number;
  };
}
