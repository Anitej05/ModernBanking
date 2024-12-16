const express = require('express')
const userApp = express.Router()
userApp.use(express.json())

const { UserAccounts } = require('../server.js');

// Route to get the accounts of the user
userApp.post('/get-account', async (req, res) => {
    const {Username} =  await req.body;
    console.log(Username)
    try{
        const response = await UserAccounts.findOne({Username: Username});
        console.log("Response: " + response)
        res.status(200).send(response.Accounts);
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Internal server error" });
    }
})

module.exports = userApp;