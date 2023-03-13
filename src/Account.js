const Transaction = require("./Transaction");
const StatementPrinter = require("./StatementPrinter");

class Account {

  #transactions
  #accountBalance

  constructor(TransactionClass = Transaction, StatementPrinterClass = StatementPrinter) {
    this.#transactions = [];
    this.#accountBalance = 0;
  }

  showBalance() {
    return this.#accountBalance
  }

  showTransactions() {
    return this.#transactions
  }

  deposit(amount, date) {
    const latestTransaction = new Transaction(
      "deposit",
      this.#accountBalance, //pass this private variable through to a separate class?
      amount,
      date
    );
    this.#transactions.unshift(latestTransaction);
    if (
      latestTransaction.amount != null &&
      latestTransaction.closingBalance != null
    ) {
      this.#accountBalance = latestTransaction.closingBalance;
    }
  }

  withdraw(amount, date) {
    const latestTransaction = new Transaction(
      "withdraw",
      this.#accountBalance, //pass this private variable through to a separate class?
      amount,
      date
    );
    this.#transactions.unshift(latestTransaction);
    if (
      latestTransaction.amount != null &&
      latestTransaction.closingBalance != null
    ) {
      this.#accountBalance = latestTransaction.closingBalance;
    }
  }

  // #createTransactionLogRecord(transactionInstance) {
  //   let typePrint;
  //   if (logType === "deposit") {
  //     typePrint = `${amount.toFixed(2)} || `;
  //   } else if (logType === "withdraw") {
  //     typePrint = ` || ${amount.toFixed(2)}`;
  //   }
  //   let record = `${date} || ${typePrint} || ${this.accountBalance.toFixed(2)}`;
  //   this.transactionsLog.unshift(record);
  // }

  // printStatement() {
  //   //order by list as-is first, then date (first 10 chars of string)
  // }
}

module.exports = Account;
