import { transactionData } from "../data/transaction";
import { getAccountById } from "./account";

export interface Transaction {
  id?: number;
  accountId: number;
  amount: number;
  date?: string;
}

export const createTransaction = (transaction: Transaction): Transaction => {
  if (!transaction.amount) {
    throw new Error("Transaction could not be created due to missing amount");
  }

  try {
    getAccountById(transaction.accountId);
  } catch (error: any) {
    throw new Error("Transaction could not be created due to missing account");
  }

  transaction.date = new Date().toISOString();
  return transactionData.createTransaction(transaction);
};

export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};
