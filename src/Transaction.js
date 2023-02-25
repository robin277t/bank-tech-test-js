class Transaction {
  constructor() {
    this.type = null;
    this.date = null;
    this.openingBalance = null;
    this.closingBalance = null;
  }

  deposit(accountBalance, amount, date) {
    this.type = "deposit";
    this.date = date;
    this.openingBalance = accountBalance;
    this.closingBalance = accountBalance + amount;
  }

  withdraw(accountBalance, amount, date) {
    this.type = "withdraw";
    this.date = date;
    this.openingBalance = accountBalance;
    this.closingBalance = accountBalance - amount;
  }
}

module.exports = Transaction