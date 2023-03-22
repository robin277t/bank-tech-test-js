class StatementPrinter {
  #transactions;

  constructor(transactionsArray) {
    this.#transactions = transactionsArray;
  }

  printTransactions() {
    this.#orderTransactionsByDate();
    return this.#stringifyTransactions();
  }

  #orderTransactionsByDate() {
    this.#transactions.sort((a, b) => {
      const dateA = Date.parse(a.getVerifiedDate());
      const dateB = Date.parse(b.getVerifiedDate());
      return dateB - dateA;
    });
  }

  #stringifyTransactions() {
    let transactionString = "";
    let outputString = "date || credit || debit || balance\n";

    this.#transactions.forEach((transaction) => {
      if (transaction.getTransactionType() === "deposit") {
        transactionString = `${transaction.getVerifiedDate()} || ${transaction
          .getVerifiedAmount()
          .toFixed(2)} || || ${transaction.getClosingBalance().toFixed(2)}`;
      }
      if (transaction.getTransactionType() === "withdraw") {
        transactionString = `${transaction.getVerifiedDate()} || || ${transaction
          .getVerifiedAmount()
          .toFixed(2)} || ${transaction.getClosingBalance().toFixed(2)}`;
      }
      outputString += `${transactionString}\n`;
    });
    return outputString;
  }
}

module.exports = StatementPrinter;
