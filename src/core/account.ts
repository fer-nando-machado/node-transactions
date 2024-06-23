import { getAccountById as getAccountByIdFromData } from "../data/account";

export const getAccountById = (accountId: number) => {
  const account = getAccountByIdFromData(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};
