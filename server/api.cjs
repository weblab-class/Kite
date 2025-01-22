/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const OpenAI = require('openai');

// import models so we can interact with the database
const User = require("./models/user.cjs");
const Character = require("./models/character.cjs");

// import authentication library
const auth = require("./auth.cjs");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket.cjs");

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
  googleid: "test_google_id_1",
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
  googleid: "test_google_id_2",
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
  googleid: "test_google_id_3",
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

router.get("/characters", auth.ensureLoggedIn, (req, res) => {
  console.log("GET /characters request received");

  Character.find({ googleid: req.user.googleid })
    .then((characters) => {
      console.log("Sending characters:", characters);
      res.send(characters);
    })
    .catch((err) => {
      console.log("Error getting characters:", err);
      res.status(500).send({ error: "Error getting characters" });
    });
});

router.post("/new-character", auth.ensureLoggedIn, (req, res) => {
  console.log("Received request body:", req.body);
  console.log("User:", req.user);

  // Check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "Must be logged in to create a character" });
  }

  if (!characterInProgress) {
    console.log("Creating new character");
    const new_character_info = req.body.new_character_info;
    // First step: Creating new character with player info
    characterInProgress = new Character({
      googleid: req.user.googleid,
      player_info: {
        character_name: new_character_info.characterName || "",
        age: new_character_info.age || "",
        job: new_character_info.job || "medium",
        gender: new_character_info.gender || "",
        player_name: new_character_info.playerName || "",
      },
    });
  } else if (req.body.stats) {
    // Second step: Adding stats
    console.log("Adding stats:", req.body.stats);
    characterInProgress.stats = req.body.stats;
  } else if (req.body.skills) {
    // Final step: Adding skills and saving to database
    console.log("Adding skills:", req.body.skills);
    characterInProgress.skills = req.body.skills;

    // Save the character to MongoDB
    return characterInProgress
      .save()
      .then((savedCharacter) => {
        const completedCharacter = savedCharacter;
        characterInProgress = null;
        return res.status(201).send(completedCharacter);
      })
      .catch((err) => {
        console.log("Error saving character:", err);
        return res.status(500).send({ error: "Error saving character" });
      });
  }

  res.status(200).send(characterInProgress);
});

router.get("/new-character", auth.ensureLoggedIn, (req, res) => {
  if (!characterInProgress) {
    return res.status(404).send({ error: "No character in progress" });
  }
  res.status(200).send(characterInProgress);
});

// Modified chat endpoint to use GPT-4o
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received chat request with prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",  // Changed to GPT-4o
      messages: [{ role: "user", content: prompt }],
    });

    console.log("OpenAI response received");
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Error processing chat request" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
