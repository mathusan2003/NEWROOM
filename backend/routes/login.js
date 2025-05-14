const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/FormDataModel');  // Ensure the path is correct based on your project structure
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_secret_key_here'; 

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json("User not found");
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Incorrect password");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
});

module.exports = router;
