class Transaction {
  #openingBalance;
  #verifiedDate;
  #verifiedAmount;
  #type;
  #closingBalance;

  constructor(transactionType, accountBalance, amount, date) {
    this.#openingBalance = accountBalance;
    this.#verifiedDate = this.#dateCheck(date);
    this.#verifiedAmount = this.#amountCheck(amount);
    this.#type = null;
    this.#closingBalance = null;

    if (transactionType === "deposit") {
      this.#calc_deposit(this.#verifiedAmount);
    } else if (transactionType === "withdraw") {
      this.#calc_withdraw(this.#verifiedAmount);
    } else {
      throw new Error("Invalid transaction type");
    }
  }

  getOpeningBalance() {
    return this.#openingBalance;
  }

  getClosingBalance() {
    return this.#closingBalance;
  }

  getTransactionType() {
    return this.#type;
  }

  getVerifiedDate() {
    return this.#verifiedDate;
  }

  getVerifiedAmount() {
    return this.#verifiedAmount;
  }

  #calc_deposit(calc_amount) {
    this.#type = "deposit";
    this.#closingBalance = this.#openingBalance + calc_amount;
  }

  #calc_withdraw(calc_amount) {
    this.#type = "withdraw";
    this.#closingBalance = this.#openingBalance - calc_amount;
    if (this.#closingBalance < 0) {
      throw new Error("Insufficient funds");
    }
  }

  #amountCheck(amount) {
    if (amount != 0 && typeof amount == "number") {
      return amount;
    } else {
      throw new Error("Invalid amount");
    }
  }

  #dateCheck(date) {
    const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
    const validDateFormat =
      /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/.test(date);
    if (validDateFormat === false) {
      console.log(
        "Date input you gave is incorrectly formatted or missing, reverting to today's date"
      );
      return todayDate;
    } else {
      return date;
    }
  }
}

module.exports = Transaction;
