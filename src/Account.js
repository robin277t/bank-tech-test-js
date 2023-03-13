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
    this.#performTransaction("deposit", amount, date);
  }

  withdraw(amount, date) {
    this.#performTransaction("withdraw", amount, date);
  }

  #performTransaction(type, amount, date) {
    try {
      const latestTransaction = new this.#TransactionClass(
        type,
        this.#accountBalance,
        amount,
        date
      );
      this.#transactions.unshift(latestTransaction);
      if (type === "deposit") {
        this.#accountBalance += amount;
      } else if (type === "withdraw") {
        this.#accountBalance -= amount;
      }
    } catch (error) {
      console.error(`Transaction error: ${error.message}`);
    }
  }
}

module.exports = Account;
