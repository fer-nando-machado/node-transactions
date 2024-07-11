import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";
import { calculateBalance } from "./transaction";

export interface Account {
  id?: number;
  document_number: string;
  balance?: number;
}

export const getAccountById = async (id: number): Promise<Account> => {
  const account = await accountData.getAccountById(id);
  if (!account) {
    throw new Error("Account not found");
  }
  const transactions = await transactionData.getTransactionsByAccountId(id);
  account.balance = calculateBalance(transactions);
  return account;
};

export const createAccount = async (account: Account): Promise<Account> => {
  if (!account.document_number) {
    throw new Error("Account could not be created due to missing document");
  }
  return await accountData.createAccount(account);
};
