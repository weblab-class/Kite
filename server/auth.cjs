const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user.cjs");
const socketManager = require("./server-socket.cjs");
const jwt = require("jsonwebtoken");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "257498817327-5t5f251gccfp98aqv3naqq985rehu0o9.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  console.log("\n=== Token Verification ===");
  console.log("Received token:", token ? token.substring(0, 20) + "..." : "No token");

  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => {
      console.log("Token verified successfully");
      const payload = ticket.getPayload();
      console.log("Token payload:", payload);
      return payload;
    })
    .catch((err) => {
      console.error("Token verification failed. Error:", err.message);
      console.error("Full error:", err);
      throw err;
    });
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
    });

    return newUser.save();
  });
}

function login(req, res) {
  console.log("\n=== Login Attempt ===");
  console.log("Request body:", req.body);
  
  verify(req.body.token)
    .then((user) => {
      console.log("Google user verified:", user);
      return getOrCreateUser(user);
    })
    .then((user) => {
      console.log("Database user:", user);
      req.session.user = user;
      console.log("Session after login:", req.session);
      res.send(user);
    })
    .catch((err) => {
      console.error("Login failed:", err.message);
      res.status(401).send({ error: err.message });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  console.log("ensureLoggedIn middleware called");
  console.log("Session:", req.session);
  console.log("User:", req.user);

  if (!req.user) {
    console.log("No user found in request");
    return res.status(401).send({ err: "not logged in" });
  }

  console.log("User is logged in, proceeding...");
  next();
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
  authenticateToken,
};
