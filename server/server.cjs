/*
This file should:
| - Connect to the database (TODO: WORKSHOP 5)
| - Sets up server middleware (i.e. addons that enable things like json parsing) (TODO: WORKSHOP 3)
| - Hooks up all the backend routes specified in api.js (TODO: WORKSHOP 4)
| - Sets up error handling in case something goes wrong when handling a request (TODO: WORKSHOP 3)
| - Actually starts the webserver
*/

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator.cjs");
validator.checkSetup();

require("dotenv").config();

//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths
const MongoStore = require("connect-mongo");

const api = require("./api.cjs");
const auth = require("./auth.cjs");

// socket stuff
const socketManager = require("./server-socket.cjs");

const { generateResponse } = require('./services/openai.js');

// Server configuration below
// TODO change connection URL after setting up your team database
const mongoConnectionURL = process.env.MONGODB_URI;
// TODO change database name to the name you chose
const databaseName = "Kite";

// mongoose 7 warning
mongoose.set("strictQuery", false);

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// 1. Session middleware first
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// 2. Body parsing middleware
app.use(express.json());

// 3. Populate user BEFORE checking login
app.use(auth.populateCurrentUser);

// 4. THEN check login for API routes
app.use("/api", auth.ensureLoggedIn);  // This is where ensureLoggedIn is being called

// 5. API routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"), (err) => {
    if (err) {
      console.log("Error sending client/dist/index.html:", err.status || 500);
      res
        .status(err.status || 500)
        .send(
          "Error sending client/dist/index.html - have you run `npm run build`?"
        );
    }
  });
});

app.post("/api/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await generateResponse(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate response" });
    }
});

// port is not defined in your original code
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
