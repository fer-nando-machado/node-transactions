import { Account } from "../core/account";
import db from ".";

class AccountData {
  async getAccountById(id: number): Promise<Account | null> {
    return db.oneOrNone("SELECT * FROM account WHERE id = $1", [id]);
  }

  async createAccount(account: Account): Promise<Account> {
    return db.one(
      "INSERT INTO account(document_number) VALUES($1) RETURNING *",
      [account.document_number]
    );
  }
}

export const accountData = new AccountData();
