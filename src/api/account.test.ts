import request from "supertest";
import express from "express";
import accountRouter from "./account";

const app = express();
app.use(express.json());
app.use("/", accountRouter);

describe("GET /account/:id ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return account details if found", async () => {
    await request(app)
      .post("/account")
      .send({ documentNumber: "12345678900" })
      .set("Accept", "application/json")
      .expect(201);

    const response = await request(app).get(`/account/1`).expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.documentNumber).toEqual("12345678900");
    expect(response.body.balance).toEqual(0);
  });

  it("should return 404 if account not found", async () => {
    const response = await request(app).get(`/account/0`).expect(404);

    expect(response.body.error).toEqual("Account not found");
  });
});

describe("POST /account", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an account and return 201 if successful", async () => {
    const response = await request(app)
      .post("/account")
      .send({ documentNumber: "98765432100" })
      .set("Accept", "application/json")
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.documentNumber).toEqual("98765432100");
  });

  it("should return 500 if creating account fails", async () => {
    const response = await request(app)
      .post("/account")
      .send({ document_number: "98765432100" })
      .set("Accept", "application/json")
      .expect(500);

    expect(response.body.error).toEqual(
      "Account could not be created due to missing document"
    );
  });
});
