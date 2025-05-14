const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: String, required: true },
  checkInDate: { type: String, required: true },
  periodOfStay: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
