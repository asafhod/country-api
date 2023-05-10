const mongoose = require("mongoose");

// database schema for User
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength: 5, maxlength: 25 },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// create model for User using schema
const User = mongoose.model("User", userSchema);

module.exports = User;
