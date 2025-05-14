const express = require('express');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Endpoint to get user data by username
router.get('/profile', (req, res) => {
  const { username } = req.query; // Get username from query params

  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  // Find user by username
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json(user);  // Return the user data as JSON
    })
    .catch(err => res.status(500).json({ message: 'Server error.', error: err }));
});

module.exports = router;
