import { accountData } from "../data/account";

export interface Account {
  id?: number;
  documentNumber: string;
}

export const getAccountById = (id: number): Account => {
  const account = accountData.getAccountById(id);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

export const createAccount = (account: Account): Account => {
  if (!account.documentNumber) {
    throw new Error("Account could not be created due to missing document");
  }
  return accountData.createAccount(account);
};
