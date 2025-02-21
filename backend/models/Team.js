const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageUrl: { type: String }
});

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  players: [PlayerSchema]
});

module.exports = mongoose.model("Team", TeamSchema);
