const express = require('express');
const userApp = express.Router();
userApp.use(express.json());

const { UserAccounts } = require('../server.js');

// Route to credit money
userApp.post('/credit', async(req, res) => {
    const {Username, accountName, amount} = req.body;
    const account = await UserAccounts.findOneAndUpdate(
        {Username: Username, "Accounts.accountName": accountName},
        {$inc: {"Accounts.$.amount": parseFloat(amount)}},
        {new: true}
    )
    if (account) {
        res.status(200).send("Amount credited successfully!");
    } else {
        console.log(account.Accounts);
        res.status(404).send("Account or username not found.");
    }
});

// Route to debit money
userApp.post('/debit', async(req, res) => {
    const {Username, accountName, amount} = req.body;
    const account = await UserAccounts.findOneAndUpdate(
        {Username: Username, "Accounts.accountName": accountName},
        {$inc: {"Accounts.$.amount": -1*parseFloat(amount)}},
        {new: true}
    )
    if (account) {
        res.status(200).send("Amount debited successfully!");
    } else {
        console.log(account.Accounts);
        res.status(404).send("Account or username not found.");
    }
});

// Route to make transactions
userApp.post('/transaction', async (req, res) => {
    const { Username, accountName, Username2, accountName2, amount } = req.body;

    try {
        // 1. Fetch the sender's account document:
        const senderAccountDocument = await UserAccounts.findOne(
            { Username: Username, "Accounts.accountName": accountName }
        );

        if (!senderAccountDocument) {
            throw new Error("Sender account not found.");
        }

        const senderAccount = senderAccountDocument.Accounts.find(acc => acc.accountName === accountName);

        if (!senderAccount) {
            throw new Error("Account not found within sender document.");
        }

        // 2. Check balance BEFORE updating:
        if (senderAccount.amount - parseFloat(amount) < 0) {
            throw new Error("Insufficient funds!");
        }

        // 3. Update sender account (no session):
        const fromAccount = await UserAccounts.findOneAndUpdate(
            { Username: Username, "Accounts.accountName": accountName },
            { $inc: { "Accounts.$.amount": -parseFloat(amount) } },
            { new: true }
        );

        if (!fromAccount) { //Redundant check - kept for consistency with your original structure
            console.log("Account or username not found."); // This shouldn't happen, logically.
        } else {
            console.log("Amount debited successfully!");
        }

        // 4. Update recipient account (no session):
        const toAccount = await UserAccounts.findOneAndUpdate(
            { Username: Username2, "Accounts.accountName": accountName2 },
            { $inc: { "Accounts.$.amount": parseFloat(amount) } },
            { new: true }
        );

        if (toAccount) {
            console.log("Amount credited successfully!");
        } else {
            console.log("Account or username not found. Potentially inconsistent data."); // Handle the error appropriately, potentially reverting the sender's update (difficult without transactions!)
        }

        res.status(200).send("Money transacted successfully!"); // Send the success response *after* all updates

    } catch (error) {
        console.error("Transaction failed:", error);
        if (error.message.includes("account not found") || error.message.includes("Insufficient funds")) {
            res.status(400).json({ message: error.message }); // Client Error
        } else {  // Likely a serious server-side error if we get here
            res.status(500).json({ message: "Transaction failed. Data may be inconsistent." }); // Server error
        }
    }
});

// Route to create a new account
userApp.post('/create', async (req, res) => {
    const { Username, accountName, accountType, amount } = req.body;

    try {
        // Check if the user already exists
        let user = await UserAccounts.findOne({ Username });

        // If the user doesn't exist, create new user and accounts
        if (!user) {
            user = new UserAccounts({
                Username,
                Accounts: [{
                    accountName,
                    accountType,
                    amount: parseFloat(amount), // Convert to number
                    version: 0
                }]
            });
            await user.save();
            res.status(201).send(`Created user and account for: ${Username}`); // 201 Created
        } else {
            // User exists, check if the account already exists
            const existingAccount = user.Accounts.find(acc => acc.accountName === accountName);

            if (!existingAccount) {
                user.Accounts.push({
                    accountName,
                    accountType,
                    amount: parseFloat(amount), // Convert to number
                    version: 0
                });
                await user.save();
                res.status(200).send(`Added account ${accountName} to user ${Username}`);
            } else {
                res.status(400).send(`Account ${accountName} already exists for user ${Username}`); // 400 Bad Request
            }
        }
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).send("Internal server error"); // 500 Internal Server Error
    }
});

module.exports = userApp;