import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import {
  Account,
  CreateVoucherDto,
  Dimension,
  DimensionType,
  FiscalYear,
} from '../types';

export class MockKitsasBook implements KitsasBookInterface {
  constructor(id: string) {
    this.bookId = id;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveVoucher(_voucher: CreateVoucherDto): Promise<string> {
    return Promise.resolve('fb6a9d86-278d-4f69-8887-b4f0b587a7cd');
  }

  private bookId: string;

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
    return [
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
    ];
  }
}
