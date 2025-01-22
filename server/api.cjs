/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const express = require("express");
const OpenAI = require("openai");

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
  apiKey: process.env.OPENAI_API_KEY,
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

// Add a temporary storage for the character being created
let characterInProgress = null;

// Store the current character ID
let currentCharacterId = null;

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
        currentCharacterId = completedCharacter._id; // Set current character ID
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

// endpoint to set current character
router.post("/set-current-character", auth.ensureLoggedIn, (req, res) => {
  const { characterId } = req.body;
  if (!characterId) {
    return res.status(400).send({ error: "Character ID is required" });
  }

  // Verify the character exists and belongs to the user
  Character.findOne({ _id: characterId, googleid: req.user.googleid })
    .then((character) => {
      if (!character) {
        return res.status(404).send({ error: "Character not found" });
      }
      currentCharacterId = characterId;
      res.status(200).send({ currentCharacterId });
    })
    .catch((err) => {
      console.log("Error setting current character:", err);
      res.status(500).send({ error: "Error setting current character" });
    });
});

// endpoint to get current character
router.get("/current-character", auth.ensureLoggedIn, (req, res) => {
  if (!currentCharacterId) {
    return res.status(404).send({ error: "No character currently selected" });
  }

  Character.findOne({ _id: currentCharacterId, googleid: req.user.googleid })
    .then((character) => {
      if (!character) {
        currentCharacterId = null;
        return res.status(404).send({ error: "Character not found" });
      }
      res.status(200).send(character);
    })
    .catch((err) => {
      console.log("Error getting current character:", err);
      res.status(500).send({ error: "Error getting current character" });
    });
});

// Modified chat endpoint to use GPT-4o
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received chat request with prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Changed to GPT-4o
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
