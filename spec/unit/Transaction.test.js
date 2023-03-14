const Transaction = require("../../src/Transaction");

describe("Block 1: Transaction Class Desposit and Withdraw functions + date/amount check", () => {
  beforeEach(() => {
    mockAccountBalance = 1000.0;
    dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  });
  it("1- deposit 100.10", () => {
    testTransaction = new Transaction(
      "deposit",
      mockAccountBalance,
      100.1,
      "2022/12/19"
    );
    expect(testTransaction.getClosingBalance()).toBe(1100.1);
  });
  it("2- deposit 600.20", () => {
    testTransaction = new Transaction(
      "deposit",
      mockAccountBalance,
      600.2,
      "2022/12/19"
    );
    expect(testTransaction.getClosingBalance()).toBe(1600.2);
  });
  it("3- withdraw 200.01", () => {
    testTransaction = new Transaction(
      "withdraw",
      mockAccountBalance,
      200.01,
      "2022/12/19"
    );
    expect(testTransaction.getClosingBalance()).toBe(799.99);
    expect(testTransaction.getVerifiedAmount()).toBe(200.01);
  });
  it("4- withdraw 1300.10 (minus figure not allowed)", () => {
    expect(() => {
      new Transaction("withdraw", mockAccountBalance, 1300.5, "2022/12/19");
    }).toThrow("Insufficient funds");
  });
  it("5- test type and date fields", () => {
    testTransaction = new Transaction(
      "deposit",
      mockAccountBalance,
      100.1,
      "2022/12/19"
    );
    expect(testTransaction.getTransactionType()).toBe("deposit");
    expect(testTransaction.getVerifiedDate()).toBe("2022/12/19");
  });
  it("6- dateCheck function test correct format", () => {
    testTransaction = new Transaction(
      "withdraw",
      mockAccountBalance,
      100.1,
      "2022/12/19"
    );
    expect(testTransaction.getTransactionType()).toBe("withdraw");
    expect(testTransaction.getVerifiedDate()).toBe("2022/12/19");
  });
  it("7- dateCheck function test 2, incorrect format 1", () => {
    testTransaction = new Transaction(
      "deposit",
      mockAccountBalance,
      100.1,
      "20221219"
    );
    expect(testTransaction.getVerifiedDate()).toContain(dateToday);
  });
  it("8- dateCheck function test 3, incorrect format 2", () => {
    testTransaction = new Transaction(
      "withdraw",
      mockAccountBalance,
      100.1,
      "22xxxk!!%$23"
    );
    expect(testTransaction.getVerifiedDate()).toContain(dateToday);
  });
  it("9- dateCheck function test 4, missing date entered", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance, 100.1);
    expect(testTransaction.getVerifiedDate()).toContain(dateToday);
  });
  it("10- amountCheck function test 1, amount entered not a number", () => {
    expect(() => {
      new Transaction("withdraw", mockAccountBalance, "100.1");
    }).toThrow("Invalid amount");
  });
  it("11- amountCheck function test 2, amount entered is 0", () => {
    expect(() => {
      new Transaction("withdraw", mockAccountBalance, 0.0);
    }).toThrow("Invalid amount");
  });
  it("12- amountCheck function test 3, amount entered is an array of 1 number", () => {
    expect(() => {
      new Transaction("withdraw", mockAccountBalance, [100]);
    }).toThrow("Invalid amount");
  });
  it("13 - amountCheck function test 4, amount entered is  less than 0", () => {
    expect(() => {
      new Transaction("deposittttt", mockAccountBalance, -100.1, "2022/12/19");
    }).toThrow("Invalid amount");
  });
  it("14 - getter for verified amount works", () => {
    testTransaction = new Transaction(
      "deposit",
      mockAccountBalance,
      100.1,
      "2022/12/19"
    );
    expect(testTransaction.getVerifiedAmount()).toBe(100.1);
  });
});
