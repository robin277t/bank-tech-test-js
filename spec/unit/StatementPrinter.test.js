// xit("4- positions latest transaction at start of array, regardless of input date", () => {
//   // test_instance_1 = {closingBalance: 200}
//   // testAccount.transactions.push(test_instance_1)
//   // test_instance_2 = {closingBalance: 500}
//   // testAccount.transactions.push(test_instance_2)

//   expect(testAccount.showTransactions().length).toBe(2);
//   testAccount.deposit(100.0, "2022/12/19");
//   expect(testAccount.showTransactions().length).toBe(3);
//   expect(testAccount.showTransactions()[1].closingBalance).toBe(200);
//   expect(testAccount.showTransactions()[0].closingBalance).toBeFalsy();
// });

//need to test ordering of transactions too

// it("4- tests ordering of transactions array", () => {
//   const transactionMock = jest.fn();
//   transactionMock.mockReturnValueOnce({
//     getVerifiedDate: () => "2022/12/18",
//   });
//   transactionMock.mockReturnValueOnce({
//     getVerifiedDate: () => "2022/12/24",
//   });
//   transactionMock.mockReturnValueOnce({
//     getVerifiedDate: () => "2022/12/17",
//   });
//   transactionMock.mockReturnValueOnce({
//     getVerifiedDate: () => "2022/12/21",
//   });

//   testAccount2 = new Account(transactionMock);

//   testAccount2.deposit(100.0, "2022/12/18");
//   testAccount2.deposit(150.0, "2022/12/24");
//   testAccount2.deposit(200.0, "2022/12/17");
//   testAccount2.deposit(333.0, "2022/12/21");

//   const transactionsTest = testAccount2.getTransactions();

//   expect(transactionsTest.length).toBe(4);
//   expect(transactionsTest[0].getVerifiedDate()).toEqual("2022/12/24");
//   // expect(testAccount.getTransactions()[3].getAmount()).toBe(200.0);
// });
