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
    console.log(this.instructions());
  }

  getBalance() {
    return `£${this.#accountBalance.toFixed(2)}`;
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

  printStatement() {
    const printer = new this.#StatementPrinterClass(this.#transactions);
    return printer.printTransactions();
  }

  instructions() {
    return `Your options and the inputs needed are as follows:
        getBalance()
        deposit(number, 'YYYY/MM/DD') --date optional, will revert to today
        withdraw(number, 'YYYY/MM/DD') --date optional, will revert to today
        printStatement()`;
  }

  #performTransaction(type, amount, date) {
    try {
      const latestTransaction = new this.#TransactionClass(
        type,
        this.#accountBalance,
        amount,
        date
      );
      this.#dateOverRideChecker(latestTransaction);
      this.#transactions.push(latestTransaction);
      if (type === "deposit") {
        this.#accountBalance += amount;
        console.log(
          `£${amount.toFixed(2)} credited to your account successfully`
        );
      }
      if (type === "withdraw") {
        this.#accountBalance -= amount;
        console.log(
          `£${amount.toFixed(2)} debited from your account successfully`
        );
      }
    } catch (error) {
      console.error(`Transaction error: ${error.message}`);
    }
  }

  #dateOverRideChecker(latestTransaction) {
    const tempTrans = this.getTransactions();
    if (
      tempTrans.length > 0 &&
      latestTransaction.getVerifiedDate() <
        tempTrans[tempTrans.length - 1].getVerifiedDate()
    ) {
      throw new Error(
        "Can't enter a date over-ride transaction that's prior to existing transactions"
      );
    }
  }
}

module.exports = Account;
