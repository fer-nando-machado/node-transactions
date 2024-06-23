import { Transaction } from "../core/transaction";

class TransactionData {
  private transactions: Transaction[];
  private nextId: number;

  constructor() {
    this.transactions = [];
    this.nextId = 0;
  }

  public getTransactionsByAccountId(accountId: number): Transaction[] {
    return this.transactions.filter((t) => t.accountId === accountId);
  }

  public createTransaction(transaction: Transaction): Transaction {
    transaction.id = ++this.nextId;
    this.transactions.push(transaction);
    return transaction;
  }
}

export const transactionData = new TransactionData();
