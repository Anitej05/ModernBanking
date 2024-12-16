const express = require("express");
const userApp = express.Router();
userApp.use(express.json());

// Import the User model from the main server file
const { User } = require('../server.js');

// Route to register users
userApp.post('/', async (req, res) => {
    const { Username, Password } = req.body;
    try {
        const response = await User.updateOne(
            { Username },
            { $setOnInsert: { Username, Password } },
            { upsert: true }
        );

        res.status(200).json({ message: "User registered successfully", response });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = userApp;
