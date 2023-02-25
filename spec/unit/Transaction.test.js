const Transaction = require("../../src/Transaction");

describe("Block 1: Transaction Class Desposit and Withdraw functions + date check", () => {
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
    testTransaction.withdraw(mockAccountBalance, 1300.5, "2022/12/19");
    expect(testTransaction.closingBalance).toBe(-300.5);
  });
  it("5- test type and date fields", () => {
    testTransaction.deposit(mockAccountBalance, 100.1, "2022/12/19");
    expect(testTransaction.type).toBe("deposit");
    expect(testTransaction.date).toBe("2022/12/19");
  });
  it("6- dateCheck function test correct format", () => {
    expect(testTransaction.dateCheck("2022/12/19")).toBe("2022/12/19");
  });
  it("7- dateCheck function test 2, incorrect format 1", () => {
    expect(testTransaction.dateCheck("20221219")).toBe("2023/02/25");
  });
  it("8- dateCheck function test 3, incorrect format 2", () => {
    expect(testTransaction.dateCheck("22xxxkjh$419")).toBe("2023/02/25");
  });
  it("9- dateCheck function test 4, missing date entered", () => {
    expect(testTransaction.dateCheck()).toBe("2023/02/25");
  });
});
