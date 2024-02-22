import { KitsasConnectionInterface } from '../interfaces';
import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import {
  Account,
  AttachmentDto,
  CreateInvoiceResponseDto,
  CreateVoucherDto,
  CreateVoucherResponseDto,
  Dimension,
  DimensionType,
  FiscalYear,
  InvoiceDto,
  InvoiceVatCodeEnum,
  Product,
  TransactionEntryDto,
} from '../types';

export class MockKitsasBook implements KitsasBookInterface {
  constructor(id: string, connection: KitsasConnectionInterface) {
    this.bookId = id;
    this.connection = connection;
  }
  getConnection(): KitsasConnectionInterface {
    return this.connection;
  }

  getDimensions(): Promise<Dimension[]> {
    return Promise.resolve([
      {
        id: '0',
        name: { fi: 'Yleinen', sv: 'Allmän', en: 'General' },
        type: DimensionType.DEFAULT,
      },
      {
        id: '1',
        name: {
          fi: 'Kustannuspaikka',
          sv: 'Kostnadsställe',
          en: 'Cost center',
        },
        type: DimensionType.CONSTCENTRE,
      },
      {
        id: '2',
        name: { fi: 'Projekti', sv: 'Projekt', en: 'Project' },
        type: DimensionType.PROJECT,
      },
      {
        id: '3',
        name: { fi: 'Kohdistus', sv: 'Markering', en: 'Marking' },
        type: DimensionType.MARKING,
      },
    ]);
  }

  saveVoucher(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _voucher: CreateVoucherDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _attachments: AttachmentDto[]
  ): Promise<CreateVoucherResponseDto> {
    return Promise.resolve({
      id: 'fb6a9d86-278d-4f69-8887-b4f0b587a7cd',
      data: {},
    });
  }

  saveInvoice(
    invoice: InvoiceDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _attachments: AttachmentDto[]
  ): Promise<CreateInvoiceResponseDto> {
    return Promise.resolve({
      voucher: {
        id: 'fb6a9d86-278d-4f69-8887-b4f0b587a7cd',
        data: {},
      },
      invoice,
    });
  }

  saveTransactions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _iban: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _startDate: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _endDate: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _entries: TransactionEntryDto[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _original: object
  ): Promise<CreateVoucherResponseDto> {
    return Promise.resolve({
      id: 'fb6a9d86-278d-4f69-8887-b4f0b587a7cd',
      data: {},
    });
  }

  getBookId(): string {
    return this.bookId;
  }

  getAccounts(): Promise<Account[]> {
    return Promise.resolve([
      {
        number: '31000',
        name: { fi: 'Myynti', sv: 'Försäljning', en: 'Sales' },
        typeCode: 'C',
      },
    ]);
  }

  async getFiscalYears(): Promise<FiscalYear[]> {
    return Promise.resolve([
      {
        id: '1',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-12-31'),
      },
      {
        id: '2',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-12-31'),
      },
      {
        id: '3',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-12-31'),
      },
    ]);
  }

  async getProducts(): Promise<Product[]> {
    return Promise.resolve([
      {
        id: '1',
        code: 'PROD1',
        name: { fi: 'Tuote 1', sv: 'Produkt 1', en: 'Product 1' },
        unit: {
          code: 'C62',
          name: { fi: 'Kappale', sv: 'Stycke', en: 'Piece' },
        },
        vat: {
          code: InvoiceVatCodeEnum.DOMESTIC,
          percent: 24,
        },
        accounting: {
          account: '31000',
          dimensions: ['0'],
        },
        price: 100,
      },
    ]);
  }

  private bookId: string;
  private connection: KitsasConnectionInterface;
}
