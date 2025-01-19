require("dotenv").config();

// Use environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// setup mongo url
const mongoose = require("mongoose");
const databaseName = "Cluster0";

// connect to mongodb
mongoose
  .connect(MONGODB_URI, {
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));


// libraries
const express = require("express");
const path = require("path");

const app = express();

// allow us to make post requests
app.use(express.json());

const character1 = {
  _id: "id1",
  player_name: "Joe",
  character_name: "Joe's Character",
  stats: {
    health: 100,
    attack: 10,
    defense: 5,
  },
};

const character2 = {
  _id: "id2",
  player_name: "Susan",
  character_name: "Suzie",
  stats: {
    health: 100,
    attack: 10,
    defense: 5,
  },
};

const character3 = {
  _id: "id3",
  player_name: "Alice",
  character_name: "Alicia",
  stats: {
    health: 100,
    attack: 10,
    defense: 5,
  },
};

const characters = [character1, character2, character3];

const character_new = {};

app.get("/api/characters", (req, res) => {
  console.log("GET /api/characters request received");
  console.log("Sending characters:", characters);
  res.send(characters);
});

app.post("/api/new-character", (req, res) => {
  const new_character_info = req.body.player_info;

  // Validate the incoming data
  if (
    !new_character_info ||
    (!new_character_info.stats && !new_character_info.skills)
  ) {
    return res.status(400).send({ error: "Invalid character data" });
  }

  // If this is an update to an existing character
  if (new_character_info._id) {
    const existingCharIndex = characters.findIndex(
      (char) => char._id === new_character_info._id
    );
    if (existingCharIndex !== -1) {
      characters[existingCharIndex] = {
        ...characters[existingCharIndex],
        ...new_character_info,
      };
      return res.status(200).send(characters[existingCharIndex]);
    }
  }

  // If this is a new character
  Object.assign(character_new, new_character_info);
  characters.push(character_new);

  console.log("Character updated:", character_new);
  res.status(201).send(character_new);
});

// anything bad happens, we log
app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
