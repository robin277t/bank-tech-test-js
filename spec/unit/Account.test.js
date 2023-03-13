const Account = require("../../src/Account");
const Transaction = require("../../src/Transaction");
jest.mock("../../src/Transaction");

describe("Block 2: Account class", () => {
  beforeEach(() => {
    testAccount = new Account();
    Transaction.mockClear();
  });
  it("1- inputs valid transaction into transactions array", () => {
    expect(testAccount.getTransactions().length).toBe(0);
    testAccount.deposit(100.0, "2022/12/19");
    expect(testAccount.getTransactions().length).toBe(1);
  });
  it("2- updates account balance assuming valid deposit transaction", () => {
    expect(testAccount.getBalance()).toBe(0);
    testAccount.deposit(200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe(200.0);
  });

  it("3- updates account balance assuming valid withdraw transaction", () => {
    expect(testAccount.getBalance()).toBe(0);
    testAccount.deposit(200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe(200.0);
    testAccount.withdraw(120.5, "2022/12/19");
    expect(testAccount.getBalance()).toBe(79.5);
  });

  it("5- does not update account balance if withdraw transaction is invalid", () => {
    Transaction.mockImplementation(() => {
      throw new Error("Invalid amount");
    });
    expect(testAccount.getBalance()).toBe(0);
    testAccount.deposit(-200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe(0);
  });
  it("6- does not update account balance if deposit transaction is invalid", () => {
    Transaction.mockImplementation(() => {
      throw new Error("Invalid amount");
    });
    expect(testAccount.getBalance()).toBe(0);
    testAccount.deposit(-200.0, "2022/12/19");
    expect(testAccount.getBalance()).toBe(0);
  });
  it("7- logs an error message if deposit transaction is an error", () => {
    const errorMsg = "Invalid amount";
    Transaction.mockImplementation(() => {
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
    Transaction.mockImplementation(() => {
      throw new Error(errorMsg);
    });
    console.error = jest.fn();
    testAccount.withdraw(100.0, "2022/12/19");
    expect(console.error).toHaveBeenCalledWith(
      `Transaction error: ${errorMsg}`
    );
  });
});
