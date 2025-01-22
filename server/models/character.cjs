const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  googleid: String,
  player_info: {
    character_name: String,
    age: Number,
    job: String,
    gender: String,
    player_name: String,
  },
  stats: {
    strength: Number,
    constitution: Number,
    size: Number,
    dexterity: Number,
    appearance: Number,
    education: Number,
    wisdom: Number,
    power: Number,
    luck: Number,
  },
  skills: {
    libraryUse: Number,
    listen: Number,
    firstAid: Number,
    medicine: Number,
    fighting: Number,
    psychology: Number,
    dodge: Number,
    spotHidden: Number,
    stealth: Number,
    intimidate: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("character", CharacterSchema);
