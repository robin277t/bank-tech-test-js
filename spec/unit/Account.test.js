const Account = require("../../src/Account");
const Transaction = require("../../src/Transaction");
const StatementPrinter = require("../../src/StatementPrinter");
jest.mock("../../src/Transaction");
jest.mock("../../src/StatementPrinter");

describe("Block 2: Account class", () => {
  beforeEach(() => {
    testAccount = new Account();
    Transaction.mockClear();
    StatementPrinter.mockClear();
  });
  it("1- inputs valid transaction into transactions array", () => {
    expect(testAccount.getTransactions().length).toBe(0);
    testAccount.deposit(100.0, "2022/12/19");
    expect(testAccount.getTransactions().length).toBe(1);
  });
  it("2- updates account balance assuming valid deposit transaction", () => {
    expect(testAccount.getBalance()).toBe("£0.00");
    testAccount.deposit(200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe("£200.00");
  });

  it("3- updates account balance assuming valid withdraw transaction", () => {
    expect(testAccount.getBalance()).toBe("£0.00");
    testAccount.deposit(200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe("£200.00");
    testAccount.withdraw(120.5, "2022/12/20");
    expect(testAccount.getBalance()).toBe("£79.50");
  });

  it("5- does not update account balance if withdraw transaction is invalid", () => {
    Transaction.mockImplementationOnce(() => {
      throw new Error("Invalid amount");
    });
    expect(testAccount.getBalance()).toBe("£0.00");
    testAccount.deposit(-200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe("£0.00");
  });
  it("6- does not update account balance if deposit transaction is invalid", () => {
    Transaction.mockImplementationOnce(() => {
      throw new Error("Invalid amount");
    });
    expect(testAccount.getBalance()).toBe("£0.00");
    testAccount.deposit(-200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe("£0.00");
  });
  it("7- logs an error message if deposit transaction is an error", () => {
    const errorMsg = "Invalid amount";
    Transaction.mockImplementationOnce(() => {
      throw new Error(errorMsg);
    });
    console.error = jest.fn();
    testAccount.deposit(100.0, "2022/12/19");
    expect(console.error).toHaveBeenCalledWith(
      `Transaction error: ${errorMsg}`
    );
  });
  it("8- logs an error message if withdraw transaction is an error", () => {
    const errorMsg = "Insufficient funds";
    Transaction.mockImplementationOnce(() => {
      throw new Error(errorMsg);
    });
    console.error = jest.fn();
    testAccount.withdraw(100.0, "2022/12/19");
    expect(console.error).toHaveBeenCalledWith(
      `Transaction error: ${errorMsg}`
    );
  });
  it("9- returns instructions string", () => {
    expect(testAccount.instructions()).toContain(
      "--date optional, will revert"
    );
  });
  it("10- does not throw error if transaction date over-ride input is after existing transactions", () => {
    const mockTransaction1 = jest.fn().mockImplementation(() => {
      return {
        getVerifiedDate: () => "2023/01/01",
      };
    });
    const mockTransaction2 = jest.fn().mockImplementation(() => {
      return {
        getVerifiedDate: () => "2023/01/02",
      };
    });

    Transaction.mockImplementationOnce(mockTransaction1);
    testAccount.deposit(100.0);
    Transaction.mockImplementationOnce(mockTransaction2);
    testAccount.withdraw(50.0);

    expect(testAccount.getBalance()).toBe("£50.00");
    expect(testAccount.getTransactions().length).toBe(2);
  });
  it("11- does not add to transactions if transaction date over-ride input is prior to existing transactions", () => {
    const mockTransaction1 = jest.fn().mockImplementation(() => {
      return {
        getVerifiedDate: () => "2023/01/01",
      };
    });
    const mockTransaction2 = jest.fn().mockImplementation(() => {
      return {
        getVerifiedDate: () => "2021/01/02",
      };
    });

    Transaction.mockImplementationOnce(mockTransaction1);
    testAccount.deposit(100.0);
    Transaction.mockImplementationOnce(mockTransaction2);
    testAccount.withdraw(50.0);

    expect(testAccount.getBalance()).toBe("£100.00");
    expect(testAccount.getTransactions().length).toBe(1);
  });
  it("12- statement printer function call", () => {
    StatementPrinter.mockImplementation(() => ({
      printTransactions: () => "I've been called",
    }));
    expect(testAccount.printStatement()).toEqual("I've been called");
  });
});
