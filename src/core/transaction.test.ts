import {
  calculateBalance,
  createTransaction,
  Transaction,
} from "./transaction";
import { Account } from "./account";
import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";

jest.mock("../data/account", () => ({
  accountData: {
    getAccountById: jest.fn(),
  },
}));

jest.mock("../data/transaction", () => ({
  transactionData: {
    getTransactionsByAccountId: jest.fn(),
    createTransaction: jest.fn(),
  },
}));

describe("createTransaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if amount is missing", async () => {
    const transaction: Transaction = { account_id: 1, amount: 0 };

    await expect(createTransaction(transaction)).rejects.toThrow(
      "Transaction could not be created due to missing amount"
    );
    expect(transactionData.createTransaction).not.toHaveBeenCalled();
  });

  it("should throw an error if account does not exist", async () => {
    const transaction: Transaction = { account_id: 1, amount: 100 };
    (accountData.getAccountById as jest.Mock).mockReturnValue(null);

    await expect(createTransaction(transaction)).rejects.toThrow(
      "Transaction could not be created due to missing account"
    );
    expect(transactionData.createTransaction).not.toHaveBeenCalled();
  });

  it("should create a transaction with current date", async () => {
    const transaction: Transaction = { account_id: 1, amount: 100 };
    const accountMock: Account = { id: 1, document_number: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValue(accountMock);

    const transactionExpected: Transaction = {
      id: 1,
      timestamp: new Date().toISOString(),
      ...transaction,
    };
    (transactionData.createTransaction as jest.Mock).mockReturnValue(
      transactionExpected
    );

    const createdTransaction: Transaction = await createTransaction(
      transaction
    );

    expect(createdTransaction).toEqual(transactionExpected);
    expect(createdTransaction.timestamp).toBeDefined();
    expect(transactionData.createTransaction).toHaveBeenCalledWith(transaction);
  });
});

describe("calculateBalance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return total account balance", () => {
    const transactions = [
      { account_id: 1, amount: 10 },
      { account_id: 1, amount: -20 },
      { account_id: 1, amount: 15 },
    ];

    const balance = calculateBalance(transactions);
    expect(balance).toEqual(5);
  });
});
