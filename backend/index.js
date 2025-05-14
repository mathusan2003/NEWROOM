const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpStore = new Map();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://nitharjude:nitharjude1906@cluster0.lfd5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Register route
app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await FormDataModel.findOne({ email });
        if (existingUser) return res.json("Already registered");

        // No hashing here
        const newUser = new FormDataModel({ email, password, name });
        await newUser.save();
        res.json("Registered successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await FormDataModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Email not found" });
        }

        // Plain text comparison (no bcrypt)
        if (password !== user.password) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        return res.json({ success: true, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

// Profile fetch route
app.get('/profile', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await FormDataModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
});

// Profile update route
app.put('/profile/update', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await FormDataModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name;

        // Update the password directly in plain text
        if (password && password.trim() !== '') {
            user.password = password;
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
});

// Send OTP route
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await FormDataModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not found" });

        const otp = Math.floor(10000 + Math.random() * 90000);
        otpStore.set(email, otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suresh.rokith123@gmail.com',
                pass: 'wwoblehdzdszmftn'
            }
        });

        await transporter.sendMail({
            from: 'support@yourcompany.com',  // Use a professional email address
            to: email,
            subject: 'Your OTP Code for Account Verification',  // Clear subject
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                color: #333;
                            }
                            .otp-container {
                                text-align: center;
                                padding: 20px;
                                background-color: #f4f4f4;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                max-width: 600px;
                                margin: 0 auto;
                            }
                            .otp-code {
                                font-size: 24px;
                                font-weight: bold;
                                color: #2D88D8;
                                margin: 20px 0;
                            }
                            .footer {
                                font-size: 12px;
                                color: #777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="otp-container">
                            <h2>Hello,</h2>
                            <p>We received a request to verify your email address. Please use the following One-Time Password (OTP) to complete your verification process:</p>
                            <div class="otp-code">${otp}</div>
                            <p>If you did not request this, please ignore this email.</p>
                            <div class="footer">
                                <p>Best regards,</p>
                                <p>RENTNEST Support Team</p>
                            </div>
                        </div>
                    </body>
                </html>
            `
        });
        

        res.json({ message: "OTP sent" });
    } catch (err) {
        res.status(500).json({ message: "Error sending OTP", error: err });
    }
});

// Verify OTP route
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);
    if (storedOtp && parseInt(otp) === storedOtp) {
        res.json({ message: "OTP verified" });
    } else {
        res.status(400).json({ message: "Invalid OTP" });
    }
});

// Reset Password route
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await FormDataModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = newPassword; // No hashing
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password", error: err });
    }
});


app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
