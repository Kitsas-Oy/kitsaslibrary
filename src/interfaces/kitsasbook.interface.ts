import { FiscalYear } from '../types/fiscalyear';

export interface KitsasBookInterface {
  getBookId(): string;

  getFiscalYears(): Promise<FiscalYear[]>;
}
