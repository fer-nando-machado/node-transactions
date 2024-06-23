import { Transaction } from "../core/transaction";

class TransactionData {
  private transactions: Transaction[];
  private nextId: number;

  constructor() {
    this.transactions = [];
    this.nextId = 0;
  }

  public createTransaction(transaction: Transaction): Transaction {
    transaction.id = ++this.nextId;
    this.transactions.push(transaction);
    return transaction;
  }
}

export const transactionData = new TransactionData();
