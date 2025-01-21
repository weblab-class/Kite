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
  player_info: {
    character_name: "Joe's Character",
    age: 20,
    job: "detective",
    gender: "Male",
    player_name: "Joe",
  },
  stats: {
    strength: 45,
    constitution: 60,
    size: 65,
    dexterity: 70,
    appearance: 55,
    education: 80,
    wisdom: 65,
    power: 50,
    luck: 75,
  },
  skills: {
    libraryUse: 50,
    listen: 50,
    firstAid: 50,
    medicine: 50,
    fighting: 50,
    psychology: 50,
    dodge: 50,
    spotHidden: 50,
    stealth: 50,
    intimidate: 50,
  },
};

const character2 = {
  _id: "id2",
  player_info: {
    character_name: "Suzie",
    age: 20,
    job: "detective",
    gender: "Female",
    player_name: "Susan",
  },
  stats: {
    strength: 55,
    constitution: 65,
    size: 70,
    dexterity: 75,
    appearance: 60,
    education: 85,
    wisdom: 70,
    power: 55,
    luck: 80,
  },
  skills: {
    libraryUse: 50,
    listen: 50,
    firstAid: 50,
    medicine: 50,
    fighting: 50,
    psychology: 50,
    dodge: 50,
    spotHidden: 50,
    stealth: 50,
    intimidate: 50,
  },
};

const character3 = {
  _id: "id3",
  player_info: {
    character_name: "Alicia",
    age: 20,
    job: "medium",
    gender: "Female",
    player_name: "Alice",
  },
  stats: {
    strength: 50,
    constitution: 70,
    size: 60,
    dexterity: 80,
    appearance: 65,
    education: 75,
    wisdom: 60,
    power: 45,
    luck: 70,
  },
  skills: {
    libraryUse: 50,
    listen: 50,
    firstAid: 50,
    medicine: 50,
    fighting: 50,
    psychology: 50,
    dodge: 50,
    spotHidden: 50,
    stealth: 50,
    intimidate: 50,
  },
};

const characters = [character1, character2, character3];

// Add a temporary storage for the character being created
let characterInProgress = null;

app.get("/api/characters", (req, res) => {
  console.log("GET /api/characters request received");
  console.log("Sending characters:", characters);
  res.send(characters);
});

app.post("/api/new-character", (req, res) => {
  console.log("Received request body:", req.body); // Add logging

  if (!characterInProgress) {
    console.log("Creating new character");
    const new_character_info = req.body.new_character_info;
    // First step: Creating new character with player info
    characterInProgress = {
      _id: `id${characters.length + 1}`, // Simple ID generation
      player_info: {
        character_name: new_character_info.characterName || "",
        age: new_character_info.age || "",
        job: new_character_info.job || "medium",
        gender: new_character_info.gender || "",
        player_name: new_character_info.playerName || "",
      },
    };
  } else if (req.body.stats) {
    // Second step: Adding stats
    console.log("Adding stats:", req.body.stats);
    characterInProgress.stats = req.body.stats;
  } else if (req.body.skills) {
    // Final step: Adding skills and pushing to characters array
    console.log("Adding skills:", req.body.skills);
    characterInProgress.skills = req.body.skills; // Simply assign the skills object directly

    // Add the completed character to the array
    characters.push({ ...characterInProgress });
    // Reset the in-progress character
    const completedCharacter = characterInProgress;
    characterInProgress = null;
    return res.status(201).send(completedCharacter);
  }

  res.status(200).send(characterInProgress);
});

app.get("/api/new-character", (req, res) => {
  if (!characterInProgress) {
    return res.status(404).send({ error: "No character in progress" });
  }
  res.status(200).send(characterInProgress);
});

// anything bad happens, we log
app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
