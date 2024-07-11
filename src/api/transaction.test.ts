import request from "supertest";
import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";
import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";
import { Account } from "../core/account";
import { Transaction } from "../core/transaction";

const app = express();
app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

jest.mock("../data/account", () => ({
  accountData: {
    getAccountById: jest.fn(),
  },
}));

jest.mock("../data/transaction", () => ({
  transactionData: {
    createTransaction: jest.fn(),
  },
}));

describe("POST /transaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a transaction and return 201 if successful", async () => {
    const accountMock: Account = { id: 1, document_number: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValue(accountMock);

    const transaction: Transaction = { account_id: 1, amount: 777 };
    const transactionExpected: Transaction = {
      id: 1,
      timestamp: new Date().toISOString(),
      ...transaction,
    };
    (transactionData.createTransaction as jest.Mock).mockReturnValue(
      transactionExpected
    );

    const response = await request(app)
      .post("/transaction")
      .send(transaction)
      .set("Accept", "application/json")
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.timestamp).toBeDefined();
    expect(response.body.account_id).toEqual(1);
    expect(response.body.amount).toEqual(777);
  });

  it("should return 500 if creating transaction fails", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({ account_id: 1 })
      .set("Accept", "application/json")
      .expect(500);

    expect(response.body.error).toEqual(
      "Transaction could not be created due to missing amount"
    );
  });
});
