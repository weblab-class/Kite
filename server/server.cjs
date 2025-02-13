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
const cors = require("cors");

const api = require("./api.cjs");
const auth = require("./auth.cjs");

// socket stuff
const socketManager = require("./server-socket.cjs");

const { generateResponse } = require("./services/openai.js");

// Import OpenAI at the top of the file
const OpenAI = require("openai");

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is in your .env file
});

// Server configuration below
// TODO change connection URL after setting up your team database
const mongoConnectionURL = process.env.MONGODB_URI;
if (!mongoConnectionURL) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

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

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = isProduction ? 'https://kite-vs0f.onrender.com' : 'http://localhost:5173';

// CORS configuration
app.use(
  cors({
    origin: allowedOrigin, // Use the appropriate origin
    credentials: true, // Allow credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(validator.checkRoutes);

// Debug middleware for session tracking
app.use((req, res, next) => {
  console.log("\n=== Request ===");
  console.log("Path:", req.path);
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  next();
});

// Session configuration
app.use(
  session({
    secret: "session-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to false for development
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "sessionId", // Added explicit session name
  })
);

app.use(express.json());
app.use(auth.populateCurrentUser);

// 4. THEN check login for API routes
// app.use("/api", auth.ensureLoggedIn);  // This is where ensureLoggedIn is being called

// 5. API routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "dist");
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

// port is not defined in your original code
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
