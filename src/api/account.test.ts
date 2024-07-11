import request from "supertest";
import express from "express";
import accountRouter from "./account";
import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";
import { Account } from "../core/account";

const app = express();
app.use(express.json());
app.use("/", accountRouter);

jest.mock("../data/account", () => ({
  accountData: {
    getAccountById: jest.fn(),
    createAccount: jest.fn(),
  },
}));

jest.mock("../data/transaction", () => ({
  transactionData: {
    getTransactionsByAccountId: jest.fn(),
  },
}));

describe("GET /account/:id ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return details if account is found", async () => {
    const accountMock: Account = { id: 1, document_number: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValue(accountMock);
    (transactionData.getTransactionsByAccountId as jest.Mock).mockReturnValue([
      { account_id: 1, amount: 100 },
      { account_id: 1, amount: -200 },
      { account_id: 1, amount: 150 },
    ]);

    const response = await request(app).get(`/account/1`).expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.document_number).toEqual("12345678900");
    expect(response.body.balance).toEqual(50);
  });

  it("should return 404 if account not found", async () => {
    (accountData.getAccountById as jest.Mock).mockReturnValue(null);
    const response = await request(app).get(`/account/0`).expect(404);
    expect(response.body.error).toEqual("Account not found");
  });
});

describe("POST /account", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an account and return 201 if successful", async () => {
    const account: Account = { document_number: "98765432100" };
    const accountExpected: Account = { id: 1, ...account };
    (accountData.createAccount as jest.Mock).mockReturnValue(accountExpected);

    const response = await request(app)
      .post("/account")
      .send(account)
      .set("Accept", "application/json")
      .expect(201);

    expect(response.body).toEqual(accountExpected);
  });

  it("should return 500 if creating account fails", async () => {
    const response = await request(app)
      .post("/account")
      .send({ document_nummer: "98765432100" })
      .set("Accept", "application/json")
      .expect(500);

    expect(response.body.error).toEqual(
      "Account could not be created due to missing document"
    );
  });
});
