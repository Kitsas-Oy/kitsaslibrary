import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import { FiscalYear } from '../types';

export class MockKitsasBook implements KitsasBookInterface {
  constructor(id: string) {
    this.bookId = id;
  }

  private bookId: string;

  getBookId(): string {
    return this.bookId;
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
