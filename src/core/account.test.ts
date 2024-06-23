import { getAccountById } from "./account";
import { accountData } from "../data/account";

jest.mock("../data/account", () => ({
  accountData: {
    getAccountById: jest.fn(),
  },
}));

describe("getAccountById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return account when account exists", () => {
    const mockAccount = { account_id: 1, document_number: "12345678900" };
    (accountData.getAccountById as jest.Mock).mockReturnValueOnce(mockAccount);

    const result = getAccountById(1);

    expect(result).toEqual(mockAccount);
    expect(accountData.getAccountById).toHaveBeenCalledWith(1);
  });

  it("should throw error when account does not exist", () => {
    (accountData.getAccountById as jest.Mock).mockReturnValueOnce(undefined);

    expect(() => {
      getAccountById(0);
    }).toThrow("Account not found");
  });
});
