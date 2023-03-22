//test1 - deposit works
//test2- withdraw works
//test3 - invalid deposit works
//test4 - invalid withdraw works
//test5 - printStatment works

const Account = require("../../src/Account");
const Transaction = require("../../src/Transaction");
const StatementPrinter = require("../../src/StatementPrinter");

describe("Block 5: Integration tests", () => {
  beforeEach(() => {
    testAccount = new Account();
  });
  it("1- valid deposit works", () => {
    testAccount.deposit(100.0, "2022/12/19");
    expect(testAccount.getTransactions().length).toBe(1);
    expect(testAccount.getBalance()).toBe("£100.00");
  });
  it("2- valid withdraw works", () => {
    testAccount.deposit(100.0, "2022/12/19");
    testAccount.withdraw(90.0, "2023/12/19");
    expect(testAccount.getTransactions().length).toBe(2);
    expect(testAccount.getBalance()).toBe("£10.00");
  });
  it("3- invalid withdraw works", () => {
    testAccount.withdraw(90.0, "2023/12/19");
    expect(testAccount.getTransactions().length).toBe(0);
    expect(testAccount.getBalance()).toBe("£0.00");
  });
  it("4- invalid deposit works", () => {
    testAccount.deposit("90.0", "2023/12/19");
    expect(testAccount.getTransactions().length).toBe(0);
    expect(testAccount.getBalance()).toBe("£0.00");
  });
  it("5- invalid date override works", () => {
    testAccount.deposit(100.0, "2023/01/01");
    testAccount.withdraw(90.0, "2023/02/02");
    testAccount.deposit(100000.0, "2022/02/02");
    expect(testAccount.getTransactions().length).toBe(2);
    expect(testAccount.getBalance()).toBe("£10.00");
  });
  it("6- statement printer works", () => {
    testAccount.deposit(100.0, "2023/01/01");
    testAccount.withdraw(90.0, "2023/02/02");
    testAccount.deposit(1000.0, "2023/03/03");
    expect(testAccount.getTransactions().length).toBe(3);
    expect(testAccount.getBalance()).toBe("£1010.00");
    expect(testAccount.printStatement()).toEqual(
      "date || credit || debit || balance\n2023/03/03 || 1000.00 || || 1010.00\n2023/02/02 || || 90.00 || 10.00\n2023/01/01 || 100.00 || || 100.00\n"
    );
  });
});
