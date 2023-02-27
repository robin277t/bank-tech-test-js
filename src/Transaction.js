class Transaction {
  constructor(transactionType, accountBalance, amount, date) {
    this.openingBalance = accountBalance;
    this.verifiedDate = this.#dateCheck(date);
    this.verifiedAmount = this.#amountCheck(amount);
    this.type = null;
    this.closingBalance = null;

    if (this.verifiedAmount) {
      if (transactionType === "deposit") {
        this.#calc_deposit(this.verifiedAmount);
      } else if (transactionType === "withdraw") {
        this.#calc_withdraw(this.verifiedAmount);
      }
    }
  }

  #calc_deposit(calc_amount) {
    this.type = "deposit";
    this.closingBalance = this.openingBalance + calc_amount;
  }

  #calc_withdraw(calc_amount) {
    this.type = "withdraw";
    this.closingBalance = this.openingBalance - calc_amount;
  }

  #amountCheck(amount) {
    if (amount != 0 && typeof amount == "number") {
      return amount;
    } else {
      console.log('amount is either 0 or an invalid format, transaction amount marked as null');
      return null;
    }
  }

  #dateCheck(date) {
    const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
    const validDateFormat =
      /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/.test(date);
    if (validDateFormat === false) {
      console.log(
        "date input is wrongly formatted or missing, reverting to today's date"
      );
      return todayDate;
    } else {
      return date;
    }
  }
}

module.exports = Transaction;
