export interface TransactionEntryDto {
  arcId: string;
  reference?: string;
  amount: string;
  bookingDate?: string;
  valueDate?: string;
  transactionDate: string;
  message?: string;
  partner?: string;
  partnerIban?: string;
  buyDate?: string;
  information?: string[];
}

export interface AddTransactionsDto {
  iban: string;
  startDate: string;
  endDate: string;
  entries: TransactionEntryDto[];
  original: object;
}
