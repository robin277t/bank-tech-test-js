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
      this.#calcDeposit(this.#verifiedAmount);
    } else if (transactionType === "withdraw") {
      this.#calcWithdraw(this.#verifiedAmount);
    }
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

  #calcDeposit(calcAmount) {
    this.#type = "deposit";
    this.#closingBalance = this.#openingBalance + calcAmount;
  }

  #calcWithdraw(calcAmount) {
    this.#type = "withdraw";
    this.#closingBalance = this.#openingBalance - calcAmount;
    if (this.#closingBalance < 0) {
      throw new Error("Insufficient funds");
    }
  }

  #amountCheck(amount) {
    if (amount > 0 && typeof amount == "number") {
      return amount;
    } else {
      throw new Error("Invalid amount");
    }
  }

  #dateCheck(date) {
    //NOTE: the regex in this function checks input date is correctly formatted
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
