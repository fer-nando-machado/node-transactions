import { Transaction } from "../core/transaction";
import db from ".";

class TransactionData {
  async getTransactionsByAccountId(id: number): Promise<Transaction[]> {
    return db.any("SELECT * FROM transaction WHERE account_id = $1", [id]);
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return db.one(
      "INSERT INTO transaction(account_id, amount, timestamp) VALUES($1, $2, $3) RETURNING *",
      [transaction.account_id, transaction.amount, transaction.timestamp]
    );
  }
}

export const transactionData = new TransactionData();
