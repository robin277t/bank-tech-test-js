const Account = require("../../src/Account");
const Transaction = require("../../src/Transaction")
jest.mock("../../src/Transaction")

describe("Block 2: Account class", () => {
  beforeEach(() => {
    testAccount = new Account
    Transaction.mockClear()
  });
  it("1- inputs valid transaction into transactions array", () => {
    expect(testAccount.transactions.length).toBe(0)
    testAccount.deposit(100.00, "2022/12/19")
    expect(testAccount.transactions.length).toBe(1)
  });
  it("2- updates account balance using mocked undefined function return", () => {
    expect(testAccount.accountBalance).toBe(0)
    testAccount.withdraw(200.00, "2022/12/19")
    expect(testAccount.accountBalance).toBeFalsy()
  });
  it("3- positions latest transaction at start of array, regardless of input date", () => {
    test_instance_1 = {closingBalance: 200}
    testAccount.transactions.push(test_instance_1)
    test_instance_2 = {closingBalance: 500}
    testAccount.transactions.push(test_instance_2)
    expect(testAccount.transactions.length).toBe(2)
    testAccount.deposit(100.0, "2022/12/19");
    expect(testAccount.transactions.length).toBe(3)
    expect(testAccount.transactions[1].closingBalance).toBe(200)
    expect(testAccount.transactions[0].closingBalance).toBeFalsy()
  });
  xit("4- private log record function creates a deposit record on valid transaciton array addition", () => {
  });
  xit("5- private log record function creates a withdraw record on valid transaciton array addition", () => {
  });
  xit("6- printStatement function calls statementprinter class", () => {
  });
});
