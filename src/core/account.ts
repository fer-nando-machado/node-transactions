import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";

export interface Account {
  id?: number;
  documentNumber: string;
  balance?: number;
}

export const getAccountById = (id: number): Account => {
  const account = accountData.getAccountById(id);
  if (!account) {
    throw new Error("Account not found");
  }
  const transactions = transactionData.getTransactionsByAccountId(id);
  account.balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  return account;
};

export const createAccount = (account: Account): Account => {
  if (!account.documentNumber) {
    throw new Error("Account could not be created due to missing document");
  }
  return accountData.createAccount(account);
};
