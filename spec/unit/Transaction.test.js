const Transaction = require("../../src/Transaction");

describe("Block 1: Transaction Class Desposit and Withdraw functions + date check", () => {
  beforeEach(() => {
    mockAccountBalance = 1000.0;
    dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  });
  it("1- deposit 100.10", () => {
    testTransaction = new Transaction("deposit", mockAccountBalance,  100.1, "2022/12/19");
    expect(testTransaction.openingBalance).toBe(1000.0);
    expect(testTransaction.closingBalance).toBe(1100.1);
  });
  it("2- deposit 600.20", () => {
    testTransaction = new Transaction("deposit", mockAccountBalance,  600.2, "2022/12/19");
    expect(testTransaction.openingBalance).toBe(1000.0);
    expect(testTransaction.closingBalance).toBe(1600.2);
  });
  it("3- withdraw 200.01", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance,  200.01, "2022/12/19");
    expect(testTransaction.closingBalance).toBe(799.99);
  });
  it("4- withdraw 1300.10 (minus figure allowed)", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance, 1300.50, "2022/12/19");
    expect(testTransaction.closingBalance).toBe(-300.5);
  });
  it("5- test type and date fields", () => {
    testTransaction = new Transaction("deposit", mockAccountBalance,  100.1, "2022/12/19");
    expect(testTransaction.type).toBe("deposit");
    expect(testTransaction.verifiedDate).toBe("2022/12/19");
  });
  it("6- dateCheck function test correct format", () => {
    testTransaction = new Transaction("deposit", mockAccountBalance,  100.1, "2022/12/19");
    expect(testTransaction.verifiedDate).toBe("2022/12/19");
  });
  it("7- dateCheck function test 2, incorrect format 1", () => {
    testTransaction = new Transaction("deposit", mockAccountBalance,  100.1, "20221219");
    expect(testTransaction.verifiedDate).toContain(dateToday);
  });
  it("8- dateCheck function test 3, incorrect format 2", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance,  100.1, "22xxxk!!%$23");
    expect(testTransaction.verifiedDate).toContain(dateToday);
  });
  it("9- dateCheck function test 4, missing date entered", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance,  100.1);
    expect(testTransaction.verifiedDate).toContain(dateToday);
  });
  it("10- amountCheck function test 1, amount entered not a number", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance, "100.1");
    expect(testTransaction.verifiedAmount).toBe(null);
  });
  it("11- amountCheck function test 2, amount entered is 0", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance, 0.0);
    expect(testTransaction.verifiedAmount).toBe(null);
  });
  it("12- amountCheck function test 3, amount entered is invalid, withdraw function not called", () => {
    testTransaction = new Transaction("withdraw", mockAccountBalance, "10.0");
    expect(testTransaction.closingBalance).toBe(null);
  });
});
