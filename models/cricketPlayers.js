const mongoose = require("mongoose");
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  runs: {
    type: Number,
  },
  wickets: {
    type: Number,
  },
  players: {
    type: String,
    enum: ["hitman", "king", "thala"],
  },
});

const indPlayer = mongoose.model("IndividualPlayer", PlayerSchema);
module.exports = indPlayer;
