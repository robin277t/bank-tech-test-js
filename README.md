# Bank Tech Test

## Overview
Coding mini-project designed to demonstrate strong processes at work; Test-Drive-Development, Object-Oriented-Programming, good commits and documentation.

The outcome is a simple nodeJS REPL application, designed to reflect basic operations of a bank account; opening, depositing, withdrawing, and printing statements.

### Requirements

- You should be able to interact with your code via a REPL (in this case node.js). You don't need to implement a command line interface that takes input from STDIN.
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria
**Given** a client makes a deposit of 1000 on 10-01-2023
**And** a deposit of 2000 on 13-01-2023
**And** a withdrawal of 500 on 14-01-2023
**When** she prints her bank statement
**Then** she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

## Installation

*These instructions apply to MacOS, Windows, or Linux*
```
1. Clone this repo and navigate to the directory where it's stored and into 'bank-tech-test-JS'
2. Check you have node.js installed by typing 'node -v' in your terminal. If this returns a version number you are good to go.
3. If no version number returned, either download package from nodejs.org or run 'brew install node' if you have homebrew installed (MacOS and Linux only, for windows search how to install npm)
4. Once you have node, in your terminal run 'npm install'
```

## Running the app
- In your terminal, navigate into the app parent folder, and then into the /src folder. 
- Type 'node -i -e "$(< Account.js)"' This will enter you into the node REPL and load the bank account app.
- Type 'myAccount = new Account' and press enter, which will create a new account called myAccount and allow you to use the app. It will also print out the instructions. The instructions are relevant to any account name (the 'myAccount' as above is flexible), so to follow them please prefix any function name with 'myAccount.' (or whatever name you chose).
- If at any time you wish to see the instructions again, type 'myAccount.instructions()' Remember to prefix any functions you run with 'myAccount.' 
- To close the app and exit the REPL, type '.exit'

## Running the tests
- In the terminal, whilst in the 'bank-tech-test-JS' folder, type 'jest --coverage' which will run all unit and integration tests with coverage statistics 


## Notes
- Numerical input and validation: This app requires that input amounts for deposit and withdraw are valid numbers, strings containing numbers (eg "500") are not acceptable. App will round to 2 decimal places when logging all transactions and updating balances. Amounts entered for deposit or withdraw must not be 0.
- Date handling: It is not defined but my assumption from the 'Acceptance criteria' given is that date of transaction should be able to be input manually with the method calls, rather than purely timestamped on execution. The functions deposit and withdraw can be called with a date, or in the absense of a date will default to taking a current timestamp.
- No overdraft facility is included, if a withdrawal takes the balance below 0 then it is denied. 
- Usage instructions: requirement is for using with a REPL, and therefore run by someone with basic programming knowledge, and therefore I have deemed it unneccesary to present the app instructions repeatedly on the console, preferring just once upon initialization. However, I have left the code so that repeats can be implemented simply, by typing ~myAccount~.instructions()' when desired in the program.
- Trailing newline characters in string outputs in the REPL ('\n') . This is an annoying feature of using javascript in node REPL, and is how it will come out without writing more code. As above, assumed user is a programmer and therefore familiar with ignoring such characters.
- *Improvements:* This app would be improved with a command line interface rather than being run in the node REPL, but was not in scope here. Using a different language such as the *Ruby REPL* would have also presented the app in a cleaner way with less typing required to execute features.

## Blueprint of the App


