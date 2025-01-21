/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user.cjs");

// import authentication library
const auth = require("./auth.cjs");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket.cjs");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(
      req.user,
      socketManager.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
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

router.get("/characters", (req, res) => {
  console.log("GET /characters request received");
  console.log("Sending characters:", characters);
  res.send(characters);
});

router.post("/new-character", (req, res) => {
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

router.get("/new-character", (req, res) => {
  if (!characterInProgress) {
    return res.status(404).send({ error: "No character in progress" });
  }
  res.status(200).send(characterInProgress);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
