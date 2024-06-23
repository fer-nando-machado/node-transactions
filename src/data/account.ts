interface Account {
  account_id: number;
  document_number: string;
}

class AccountData {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public getAccountById(accountId: number): Account | undefined {
    return this.accounts.find((acc) => acc.account_id === accountId);
  }
}

export const accountData = new AccountData();
