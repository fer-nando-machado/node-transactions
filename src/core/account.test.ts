import { Account, createAccount, getAccountById } from "./account";
import { accountData } from "../data/account";

jest.mock("../data/account", () => ({
  accountData: {
    getAccountById: jest.fn(),
    createAccount: jest.fn(),
  },
}));

describe("getAccountById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return account when account exists", () => {
    const mockAccount: Account = { id: 1, documentNumber: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValueOnce(mockAccount);

    const account = getAccountById(1);

    expect(account).toEqual(mockAccount);
    expect(accountData.getAccountById).toHaveBeenCalledWith(1);
  });

  it("should throw error when account does not exist", () => {
    (accountData.getAccountById as jest.Mock).mockReturnValueOnce(undefined);

    expect(() => {
      getAccountById(0);
    }).toThrow("Account not found");
  });
});

describe("createAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if documentNumber is missing", () => {
    const account: Account = { documentNumber: "" };

    expect(() => {
      createAccount(account);
    }).toThrowError("Account could not be created due to missing document");
    expect(accountData.createAccount).not.toHaveBeenCalled();
  });

  it("should create an account and assign an id", () => {
    const account: Account = { documentNumber: "12345678900" };
    const expectedAccount: Account = { id: 1, ...account };
    (accountData.createAccount as jest.Mock).mockReturnValueOnce(
      expectedAccount
    );

    const createdAccount = createAccount(account);
    expect(createdAccount).toEqual(expectedAccount);
    expect(accountData.createAccount).toHaveBeenCalledWith(account);
  });
});
