const Transaction = require("../../src/Transaction");

describe("Block 1: Transaction Class Desposit and Withdraw functions", () => {
  beforeEach(() => {
    testTransaction = new Transaction();
    mockAccountBalance = 1000.0;
  });
  it("1- deposit 100.10", () => {
    testTransaction.deposit(mockAccountBalance, 100.1, "2022/12/19");
    expect(testTransaction.openingBalance).toBe(1000.0);
    expect(testTransaction.closingBalance).toBe(1100.1);
  });
  it("2- deposit 600.20", () => {
    testTransaction.deposit(mockAccountBalance, 600.2, "2022/12/19");
    expect(testTransaction.openingBalance).toBe(1000.0);
    expect(testTransaction.closingBalance).toBe(1600.2);
  });
  it("3- withdraw 200.01", () => {
    testTransaction.withdraw(mockAccountBalance, 200.01, "2022/12/19");
    expect(testTransaction.closingBalance).toBe(799.99);
  });
  it("4- withdraw 1300.10 (minus figure allowed)", () => {
    testTransaction.withdraw(mockAccountBalance, 1300.50, "2022/12/19");
    expect(testTransaction.closingBalance).toBe(-300.50);
  });
  it("5- test type and date fields", () => {
    testTransaction.deposit(mockAccountBalance, 100.1, "2022/12/19");
    expect(testTransaction.type).toBe("deposit");
    expect(testTransaction.date).toBe("2022/12/19");
  });
});
