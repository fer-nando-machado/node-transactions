import { Account, createAccount, getAccountById } from "./account";
import { accountData } from "../data/account";
import { transactionData } from "../data/transaction";

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

describe("getAccountById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return account when account exists", async () => {
    const accountMock: Account = { id: 1, document_number: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValue(accountMock);
    (transactionData.getTransactionsByAccountId as jest.Mock).mockReturnValue([
      { account_id: 1, amount: 100 },
      { account_id: 1, amount: -200 },
      { account_id: 1, amount: 150 },
    ]);

    const account = await getAccountById(1);
    expect(account).toEqual(accountMock);
    expect(account.balance).toEqual(50);
  });

  it("should throw error when account does not exist", async () => {
    (accountData.getAccountById as jest.Mock).mockReturnValue(null);
    await expect(getAccountById(-1)).rejects.toThrow("Account not found");
  });
});

describe("createAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if document number is missing", async () => {
    const account: Account = { document_number: "" };

    await expect(createAccount(account)).rejects.toThrow(
      "Account could not be created due to missing document"
    );

    expect(accountData.createAccount).not.toHaveBeenCalled();
  });

  it("should create an account and assign an id", async () => {
    const account: Account = { document_number: "12345678900" };
    const accountExpected: Account = { id: 1, ...account };
    (accountData.createAccount as jest.Mock).mockReturnValue(accountExpected);

    const createdAccount = await createAccount(account);
    expect(createdAccount).toEqual(accountExpected);
    expect(accountData.createAccount).toHaveBeenCalledWith(account);
  });
});
