const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { name, email, roomNo, guests, checkInDate, periodOfStay, role } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (roomNo) user.roomNo = roomNo;
    if (guests) user.guests = guests;
    if (checkInDate) user.checkInDate = checkInDate;
    if (periodOfStay) user.periodOfStay = periodOfStay;
    if (role) user.role = role;
    
    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.deleteOne({ _id: userId });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
};
