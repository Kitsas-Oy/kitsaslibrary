export interface InvoiceArticleDto {
  id?: string;

  code?: string;

  name?: string;

  description?: string;
}

export interface InvoiceRowQuantityDto {
  delivered?: number;

  postDelivered?: number;

  invoiced: number;

  unit?: string;

  unCode?: string;
}

export enum InvoiceVatCodeEnum {
  VATFREE = 'VATFREE',
  VAT0 = 'VAT0',
  DOMESTIC = 'DOMESTIC',
  REVERSE_EU_GOODS = 'REVERSE_EU_GOODS',
  REVERSE_EU_SERVICES = 'REVERSE_EU_SERVICES',
  REVERSE_CONSTRUCTION = 'REVERSE_CONSTRUCTION',
  MARGINAL_USED_GOODS = 'MARGINAL_USED_GOODS',
  MARGINAL_ARTWORK = 'MARGINAL_ARTWORK',
  MARGINAL_COLLECTORS_ITEMS = 'MARGINAL_COLLECTORS_ITEMS',
}

export interface InvoiceRowVatDto {
  code: InvoiceVatCodeEnum;

  percent?: number;
}

export interface InvoiceRowDiscountDto {
  percent?: number;

  amount?: number;

  type?: number;
}

export interface InvoicePeriodDto {
  stardDate: string;

  endDate: string;
}

export interface InvoiceRowAccountingDto {
  account: string;

  dimensions?: string[];
}

export interface InvoiceRowSumsDto {
  vatExcluded: string;

  vat: string;

  vatIncluded: string;
}

export interface InvoiceRowDto {
  article?: InvoiceArticleDto;

  quantity?: InvoiceRowQuantityDto;

  unitPrice?: number;

  vat?: InvoiceRowVatDto;

  discount?: InvoiceRowDiscountDto;

  freeText?: string;

  period?: InvoicePeriodDto;

  deliveryDate?: string;

  accounting?: InvoiceRowAccountingDto;

  sums?: InvoiceRowSumsDto;

  extraData?: object;
}

export interface PostalAddressDto {
  street: string[];

  postalCode: string;

  city: string;

  countryCode?: string;

  countryName?: string;

  countrySubdivision?: string;
}

export interface EInvoiceAddressDto {
  identifier: string;

  intermediator: string;
}

export interface InvoiceCustomerDto {
  id?: string;

  name: string;

  vatId?: string;

  businessId?: string;

  address?: PostalAddressDto;

  email?: string;

  eInvoice?: EInvoiceAddressDto;

  language?: string;
}

export interface InvoiceDeliveryDto {
  address?: PostalAddressDto;

  date?: string;

  period?: InvoicePeriodDto;
}

export interface InvoicePaymentTermsDto {
  dueDate?: string;

  overDueInterestPercent?: number;
}

export interface InvoiceDetailsDto {
  number?: string;

  date?: string;

  orderDate?: string;

  orderId?: string;

  ordererName?: string;

  salesPerson?: string;

  agreementId?: string;

  buyerReference?: string;

  title?: string;

  freeText?: string;

  itemization?: string[];

  periodForComplaints?: number;
}

export enum InvoiceSentMethod {
  POST = 'POST',
  EMAIL = 'EMAIL',
  EINVOICE = 'EINVOICE',
  PRINT = 'PRINT',
}

export enum SendInvoiceStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  DELIVER = 'DELIVER',
  SENT = 'SENT',
}

export enum InvoiceRowVatType {
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
  LONG = 'LONG',
}

export interface InvoiceDto {
  customer: InvoiceCustomerDto;

  delivery?: InvoiceDeliveryDto;

  rows: InvoiceRowDto[];

  paymentTerms?: InvoicePaymentTermsDto;

  details?: InvoiceDetailsDto;

  sentMethod: InvoiceSentMethod;

  status: SendInvoiceStatus;

  language: string;

  currency: string;

  vatType?: InvoiceRowVatType;
}

export interface CreateInvoiceResponseVoucherDto {
  id: string;

  data: object;
}

export interface CreateInvoiceResponseDto {
  voucher: CreateInvoiceResponseVoucherDto;

  invoice: InvoiceDto;
}
