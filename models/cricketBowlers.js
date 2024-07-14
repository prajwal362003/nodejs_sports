const mongoose = require("mongoose");
const bowlerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  franchise: {
    type: String,
    required: true,
  },

  matchesPlayed: {
    type: Number,
  },

  noOfWickets: {
    type: Number,
    required: true,
  },

  diffTypes: {
    type: String,
    enum: ["seamer", "spinner", "medium-pacer", "china-man"],
  },
});

const bowler = mongoose.model("bowler", bowlerSchema);
module.exports = bowler;
