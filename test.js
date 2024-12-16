const mongoose = require('mongoose');
const { User, UserAccounts } = require('./server'); // Import your models

// Sample test users with accounts to insert
const testAccounts = [
  {
    Username: "Anitej2005",
    Accounts: [
      {
        accountName: "Savings",
        accountType: "Saving",
        amount: 1000,
        version: 0
      },
      {
        accountName: "Checking",
        accountType: "Current",
        amount: 500,
        version: 0
      }
    ]
  },
  {
    Username: "Merciless_God",
    Accounts: [
      {
        accountName: "MainAccount",
        accountType: "Saving",
        amount: 1500,
        version: 0
      }
    ]
  }
];

// Function to add test users and accounts if not already present
async function addTestAccounts() {
  try {
    for (let testAccount of testAccounts) {
      const { Username, Accounts } = testAccount;

      // Check if the user already exists
      let user = await UserAccounts.findOne({ Username });

      // If the user doesn't exist, create new user and accounts
      if (!user) {
        user = new UserAccounts({
          Username,
          Accounts
        });
        await user.save();
        console.log(`Created user and accounts for: ${Username}`);
      } else {
        // User exists, check if the accounts already exist
        Accounts.forEach(async (account) => {
          const existingAccount = user.Accounts.find(acc => acc.accountName === account.accountName);
          
          if (!existingAccount) {
            user.Accounts.push(account); // Add account if not present
            console.log(`Added account ${account.accountName} to user ${Username}`);
          }
        });
        await user.save(); // Save the updated user document
      }
    }
  } catch (error) {
    console.error("Error creating test accounts:", error);
  }
}

// Connect to the database and add test accounts
mongoose.connect("mongodb://localhost:27017/accounts")
  .then(() => {
    console.log("Connected to the database!");
    addTestAccounts(); // Call the function to add test accounts
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });
