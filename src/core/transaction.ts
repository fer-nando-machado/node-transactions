import { transactionData } from "../data/transaction";

export interface Transaction {
  id?: number;
  accountId: number;
  amount: number;
  date?: string;
}

export const createTransaction = (transaction: Transaction): Transaction => {
  transaction.date = new Date().toISOString();
  return transactionData.createTransaction(transaction);
};
