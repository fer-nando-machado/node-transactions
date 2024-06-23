import { Account } from "../core/account";

class AccountData {
  private accounts: Account[];
  private currentId: number;

  constructor() {
    this.accounts = [];
    this.currentId = 0;
  }

  public getAccountById(id: number): Account | undefined {
    return this.accounts.find((acc) => acc.id === id);
  }

  public createAccount(account: Account): Account {
    account.id = ++this.currentId;
    this.accounts.push(account);
    return account;
  }
}

export const accountData = new AccountData();
