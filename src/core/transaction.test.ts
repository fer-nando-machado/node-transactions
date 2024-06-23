import { createTransaction, Transaction } from "./transaction";
import { transactionData } from "../data/transaction";
import { getAccountById } from "./account";

jest.mock("../data/transaction", () => ({
  transactionData: {
    createTransaction: jest.fn(),
  },
}));

jest.mock("./account", () => ({
  getAccountById: jest.fn(),
}));

describe("createTransaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if amount is missing", () => {
    const transaction: Transaction = { accountId: 1, amount: 0 };

    expect(() => {
      createTransaction(transaction);
    }).toThrowError("Transaction could not be created due to missing amount");

    expect(transactionData.createTransaction).not.toHaveBeenCalled();
  });

  it("should throw an error if account does not exist", () => {
    const transaction: Transaction = { accountId: 1, amount: 100 };
    (getAccountById as jest.Mock).mockImplementation(() => {
      throw new Error("Account not found");
    });

    expect(() => {
      createTransaction(transaction);
    }).toThrowError("Transaction could not be created due to missing account");

    expect(transactionData.createTransaction).not.toHaveBeenCalled();
  });

  it("should create a transaction with current date", () => {
    const transaction: Transaction = { accountId: 1, amount: 100 };
    (getAccountById as jest.Mock).mockReturnValueOnce({ accountId: 1 });

    const expectedTransaction: Transaction = {
      id: 1,
      date: new Date().toISOString(),
      ...transaction,
    };
    (transactionData.createTransaction as jest.Mock).mockReturnValueOnce(
      expectedTransaction
    );

    const createdTransaction: Transaction = createTransaction(transaction);

    expect(createdTransaction).toEqual(expectedTransaction);
    expect(createdTransaction.date).toBeDefined();
    expect(transactionData.createTransaction).toHaveBeenCalledWith(transaction);
  });
});
