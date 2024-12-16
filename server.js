const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.listen(5000, () => {
    console.log("Backend server running at port 5000...");
});

// Database connection
mongoose.connect("mongodb://localhost:27017/accounts")
.then(() => console.log("Connected to the database successfully!"))
.catch((error) => console.log("The following error occurred: ", error));

// User schema
const userSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

const accountSchema = new mongoose.Schema({
    accountName: {type: String, required: true, unique: true},
    accountType: {type: String, required: true},
    amount: {type: Number, required: true, min: 0},
    version: {type: Number, required: true, default: 0}
})

const userAccountSchema = new mongoose.Schema({
    Username: {type: String, required: true, unique: true},
    Accounts: [accountSchema]
})

const User = mongoose.model("user", userSchema);
const UserAccounts = mongoose.model("account", userAccountSchema);

// Export the User and UserAccounts model to be used in other API files
module.exports = { User, UserAccounts };

// Import APIs
const userLogin = require('./APIs/userLogin');
const userRegister = require('./APIs/userRegistration');
const userAccounts = require('./APIs/userAccounts');
const userActions = require('./APIs/userActions');

// Use APIs
app.use('/login', userLogin);
app.use('/register', userRegister);
app.use('/accounts', userAccounts);
app.use('/actions', userActions);