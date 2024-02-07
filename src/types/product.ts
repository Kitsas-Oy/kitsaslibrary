import { InvoiceRowAccountingDto, InvoiceRowVatDto } from './invoice';
import { LanguageString } from './language';

interface ProductUnitDto {
  code: string;
  name: LanguageString;
}

export interface Product {
  id: string;
  code?: string;
  name: LanguageString;
  unit: ProductUnitDto;
  price: number;
  vat: InvoiceRowVatDto;
  accounting: InvoiceRowAccountingDto;
}
