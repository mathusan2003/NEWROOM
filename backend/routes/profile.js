// routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

// Multer setup for profile image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Get user by email
router.get('/', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching user');
    }
});

// ✅ Update user profile
router.put('/update', async (req, res) => {
    const { email, name, password, profilePic } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, password, profilePic },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).send('Error updating profile');
    }
});

// ✅ Upload profile image
router.post('/upload', upload.single('profilePic'), (req, res) => {
    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

module.exports = router;
