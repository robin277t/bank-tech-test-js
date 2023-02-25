class Transaction {
  constructor() {
    this.type = null;
    this.date = null;
    this.openingBalance = null;
    this.closingBalance = null;
  }

  deposit(accountBalance, amount, date) {
    this.type = "deposit";
    this.date = this.dateCheck(date);
    this.openingBalance = accountBalance;
    this.closingBalance = accountBalance + amount;
  }

  withdraw(accountBalance, amount, date) {
    this.type = "withdraw";
    this.date = this.dateCheck(date);
    this.openingBalance = accountBalance;
    this.closingBalance = accountBalance - amount;
  }

  dateCheck(date) {
    const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
    const validDateFormat =
      /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/.test(date);
    if (validDateFormat === false
    ) {
      console.log("date input is wrongly formatted or missing, reverting to today's date");
      return todayDate;
    } else {
      return date;
    }
  }
}

module.exports = Transaction