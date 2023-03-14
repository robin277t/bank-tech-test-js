const StatementPrinter = require("../../src/StatementPrinter");

describe("Block3, StatementPrinter class", () => {
  let mockInstances;
  beforeEach(() => {
    mockInstances = [
      {
        getVerifiedDate: () => "2022/02/14",
        getTransactionType: () => "deposit",
        getVerifiedAmount: () => 100,
        getClosingBalance: () => 999.5,
      },
      {
        getVerifiedDate: () => "2021/01/01",
        getTransactionType: () => "withdraw",
        getVerifiedAmount: () => 100.5,
        getClosingBalance: () => 899.5,
      },
      {
        getVerifiedDate: () => "2023/03/14",
        getTransactionType: () => "deposit",
        getVerifiedAmount: () => 350.0,
        getClosingBalance: () => 1349.5,
      },
    ];
    testStatementPrinter = new StatementPrinter(mockInstances);
  });

  it("1 - orders transactions array by date", () => {
    testStatementPrinter.printTransactions();
    expect(mockInstances[2].getVerifiedDate()).toEqual("2021/01/01");
    expect(mockInstances[1].getVerifiedDate()).toEqual("2022/02/14");
    expect(mockInstances[0].getVerifiedDate()).toEqual("2023/03/14");
  });

  it("2 - stringifies a single deposit transaction", () => {
    expect(testStatementPrinter.printTransactions()).toContain(
      "2022/02/14 || 100.00 || || 999.50"
    );
  });

  it("3 - stringifies a single withdraw transaction", () => {
    expect(testStatementPrinter.printTransactions()).toContain(
      "2021/01/01 || || 100.50 || 899.50"
    );
  });
  it("4 - stringifies multiple transaction instances", () => {
    expect(testStatementPrinter.printTransactions()).toContain(
      "2021/01/01 || || 100.50 || 899.50"
    );
    expect(testStatementPrinter.printTransactions()).toContain(
      "2022/02/14 || 100.00 || || 999.50"
    );
  });
  it("5 - return printed statment header", () => {
    expect(testStatementPrinter.printTransactions()).toContain(
      "date || credit || debit || balance\n"
    );
  });
  it("6 - return printed statment with header and transactions", () => {
    expect(testStatementPrinter.printTransactions()).toEqual(
      "date || credit || debit || balance\n2023/03/14 || 350.00 || || 1349.50\n2022/02/14 || 100.00 || || 999.50\n2021/01/01 || || 100.50 || 899.50\n"
    );
  });
});
