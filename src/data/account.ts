import { Account } from "../core/account";

class AccountData {
  private accounts: Account[];
  private nextId: number;

  constructor() {
    this.accounts = [];
    this.nextId = 0;
  }

  public getAccountById(id: number): Account | undefined {
    return this.accounts.find((acc) => acc.id === id);
  }

  public createAccount(account: Account): Account {
    account.id = ++this.nextId;
    this.accounts.push(account);
    return account;
  }
}

export const accountData = new AccountData();
