/*
This file should:
| - Connect to the database (TODO: WORKSHOP 5)
| - Sets up server middleware (i.e. addons that enable things like json parsing) (TODO: WORKSHOP 3)
| - Hooks up all the backend routes specified in api.js (TODO: WORKSHOP 4)
| - Sets up error handling in case something goes wrong when handling a request (TODO: WORKSHOP 3)
| - Actually starts the webserver
*/
require("dotenv").config();

// libraries
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

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
  if (!new_character_info || !new_character_info.stats) {
    return res.status(400).send({ error: "Invalid character data" });
  }

  Object.assign(character_new, new_character_info);
  characters.push(character_new); // Add the new character to the array

  console.log("New character added:", character_new);
  res.status(201).send(character_new);
});

// anything bad happens, we log
app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
