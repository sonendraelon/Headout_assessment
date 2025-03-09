const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: String,
  clues: [String],
  funFacts: [String],
  trivia: [String],
});

module.exports = mongoose.model("Destination", destinationSchema);
