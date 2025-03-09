const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
