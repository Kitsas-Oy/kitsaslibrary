import {
  Account,
  AttachmentDto,
  CreateVoucherDto,
  CreateVoucherResponseDto,
  Dimension,
  FiscalYear,
} from '../types';
import { CreateInvoiceResponseDto, InvoiceDto } from '../types/invoice';
import { Product } from '../types/product';
import { TransactionEntryDto } from '../types/transactions';

/**
 * Interface representing an accounting of the organization.
 *
 * You get KitsasBookInterface from {@link KitsasOfficeInterface.getBooks}
 */
export interface KitsasBookInterface {
  /**
   * Get the book ID.
   * @returns The book ID as a string.
   */
  getBookId(): string;

  /**
   * Get the accounting accounts.
   * @returns A promise that resolves to an array of Account objects.
   */
  getAccounts(): Promise<Account[]>;

  /**
   * Get the dimensions.
   * @returns A promise that resolves to an array of Dimension objects.
   */
  getDimensions(): Promise<Dimension[]>;

  /**
   * Get the fiscal years.
   * @returns A promise that resolves to an array of FiscalYear objects.
   */
  getFiscalYears(): Promise<FiscalYear[]>;

  /**
   * Save a voucher.
   * @param voucher - The voucher to save.
   * @param attachments - The attachments associated with the voucher.
   * @returns A promise that resolves to a CreateVoucherResponseDto object.
   */
  saveVoucher(
    voucher: CreateVoucherDto,
    attachments: AttachmentDto[]
  ): Promise<CreateVoucherResponseDto>;

  /**
   * Save an invoice.
   * @param invoice - The invoice to save.
   * @param attachments - The attachments associated with the invoice.
   * @returns A promise that resolves to a CreateInvoiceResponseDto object.
   */
  saveInvoice(
    invoice: InvoiceDto,
    attachments: AttachmentDto[]
  ): Promise<CreateInvoiceResponseDto>;

  /**
   * Save transactions.
   * @param iban - The IBAN of the bank account.
   * @param startDate - The start date of the transactions.
   * @param endDate - The end date of the transactions.
   * @param entries - The transaction entries.
   * @param original - The original object.
   * @returns A promise that resolves to a CreateVoucherResponseDto object.
   */
  saveTransactions(
    iban: string,
    startDate: Date,
    endDate: Date,
    entries: TransactionEntryDto[],
    original: object
  ): Promise<CreateVoucherResponseDto>;

  /**
   * Get the products.
   * @returns A promise that resolves to an array of Product objects.
   */
  getProducts(): Promise<Product[]>;
}
