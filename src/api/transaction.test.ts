import request from "supertest";
import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";

const app = express();
app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

describe("POST /transaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a transaction and return 201 if successful", async () => {
    const account = await request(app)
      .post("/account")
      .send({ documentNumber: "12345678900" })
      .set("Accept", "application/json")
      .expect(201);

    const response = await request(app)
      .post("/transaction")
      .send({ accountId: account.body.id, amount: 777 })
      .set("Accept", "application/json")
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.date).toBeDefined();
    expect(response.body.accountId).toEqual(account.body.id);
    expect(response.body.amount).toEqual(777);
  });

  it("should return 500 if creating transaction fails", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({ accountId: 1 })
      .set("Accept", "application/json")
      .expect(500);

    expect(response.body.error).toEqual(
      "Transaction could not be created due to missing amount"
    );
  });
});
