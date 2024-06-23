import { accountData } from "../data/account";

export const getAccountById = (accountId: number) => {
  const account = accountData.getAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};
