const Transaction = require("./Transaction");
const StatementPrinter = require("./StatementPrinter");

class Account {
  #transactions;
  #accountBalance;
  #TransactionClass;
  #StatementPrinterClass;

  constructor(
    TransactionClass = Transaction,
    StatementPrinterClass = StatementPrinter
  ) {
    this.#TransactionClass = TransactionClass;
    this.#StatementPrinterClass = StatementPrinterClass;
    this.#transactions = [];
    this.#accountBalance = 0;
  }

  getBalance() {
    return this.#accountBalance;
  }

  getTransactions() {
    return this.#transactions;
  }

  deposit(amount, date) {
    try {
      const latestTransaction = new this.#TransactionClass(
        "deposit",
        this.#accountBalance,
        amount,
        date
      );
      this.#transactions.unshift(latestTransaction);
      this.#accountBalance += amount;
    } catch (error) {
      console.error(`Transaction error: ${error.message}`);
    }
  }

  withdraw(amount, date) {
    try {
      const latestTransaction = new this.#TransactionClass(
        "withdraw",
        this.#accountBalance,
        amount,
        date
      );
      this.#transactions.unshift(latestTransaction);
      this.#accountBalance -= amount;
    } catch (error) {
      console.error(`Transaction error: ${error.message}`);
    }
  }
}

module.exports = Account;
