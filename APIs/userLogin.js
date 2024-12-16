const express = require("express");
const userApp = express.Router();
userApp.use(express.json());

// Import the User model from the main server file
const { User } = require('../server.js'); // This imports the User model directly from server.js

// Route to login user
userApp.post('/', async (req, res) => {
    const { Username, Password } = req.body;
    try {
        console.log('Login attempt received:', { Username, Password });
        const user = await User.findOne({ Username });

        if (user) {
            if (user.Password === Password) {
                res.status(200).json({ message: "Login successful" });
            } else {
                res.status(400).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(404).json({ message: "User doesn't exist" });
    }
});

module.exports = userApp;
