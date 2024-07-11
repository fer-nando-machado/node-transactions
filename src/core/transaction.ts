import { transactionData } from "../data/transaction";
import { accountData } from "../data/account";

export interface Transaction {
  id?: number;
  account_id: number;
  amount: number;
  timestamp?: string;
}

export const createTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  if (!transaction.amount) {
    throw new Error("Transaction could not be created due to missing amount");
  }

  const account = accountData.getAccountById(transaction.account_id);
  if (!account) {
    throw new Error("Transaction could not be created due to missing account");
  }

  transaction.timestamp = new Date().toISOString();
  return await transactionData.createTransaction(transaction);
};

export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};
