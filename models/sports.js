const mongoose = require("mongoose");

const sportsPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  role: {
    type: String,
    enum: ["batsman", "bowler", "allrounder"],
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },
});

// Now create a model from schema
const Player = mongoose.model("Sports", sportsPersonSchema);
module.exports = Player;
