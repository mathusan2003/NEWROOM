const express = require("express");
const {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userController"); // path is correct

const router = express.Router();

// Get all users with role "user"
router.get("/users", getAllUsers);

// Update a user by ID (admin only)
router.put("/user/:userId", updateUserByAdmin);

// Delete a user by ID (admin only)
router.delete("/user/:userId", deleteUserByAdmin);

module.exports = router;
