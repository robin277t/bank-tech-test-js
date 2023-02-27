const Transaction = require("./Transaction");
const StatementPrinter = require("./StatementPrinter")

class Account {
  constructor() {
    this.transactions = [];
    this.accountBalance = 0;
  }

  deposit(amount, date) {
    const latestTransaction = new Transaction("deposit", this.accountBalance, amount, date);
    this.transactions.unshift(latestTransaction);
    this.accountBalance = latestTransaction.closingBalance;
  }

  withdraw(amount, date) {
    const latestTransaction = new Transaction("withdraw", this.accountBalance, amount, date);
    this.transactions.unshift(latestTransaction);
    this.accountBalance = latestTransaction.closingBalance;
  }

  #createTransactionLogRecord() {}

  printStatement() {}
}

module.exports = Account
