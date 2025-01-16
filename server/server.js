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

const test_data = {
  _id: "id1",
  player_name: "Joe",
  character_name: "Joe's Character",
  stats: {
    health: 100,
    attack: 10,
    defense: 5,
  },
};

// allow us to make post requests
app.use(express.json());

app.get("/api/characters", (req, res) => {
  res.send(test_data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// anything bad happens, we log
app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});
