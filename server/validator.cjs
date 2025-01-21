const fs = require("fs");
const net = require("net");
const path = require("path");

/**
 * Provides some basic checks to make sure you've
 * correctly set up your repository.
 *
 * You normally shouldn't need to modify this file.
 *
 * Curent checks:
 * - node_modules exists
 * - warns if visiting port 3000 while running hot reloader
 */

class NodeSetupError extends Error {}
let routeChecked = false;

// poke port 5173 to see if 'npm run dev' was possibly called
function checkHotLoader() {
  return new Promise((resolve, reject) => {
    var server = net.createServer();

    server.once("error", (err) => {
      resolve(err.code === "EADDRINUSE");
    });

    server.once("listening", () => server.close());
    server.once("close", () => resolve(false));
    server.listen(5173);
  });
}

module.exports = {
  checkSetup: () => {
    try {
      // Let's check if the directory exists first
      if (!fs.existsSync(path.join(process.cwd(), "node_modules"))) {
        console.error("Directory does not exist!");
        throw new Error("node_modules directory not found");
      }

      // If it exists, let's try to read its contents
      const contents = fs.readdirSync(path.join(process.cwd(), "node_modules"));
      console.log("node_modules contents:", contents.slice(0, 5), "..."); // Show first 5 items
    } catch (e) {
      console.error("Error details:", e);
      throw new NodeSetupError(
        "node_modules not found! This probably means you forgot to run 'npm install'"
      );
    }
  },

  checkRoutes: (req, res, next) => {
    if (!routeChecked && req.url === "/") {
      checkHotLoader().then((active) => {
        if (active) {
          console.log(
            "Warning: It looks like 'npm run dev' may be running. Are you sure you don't want\n" +
              "to use the hot reloader? To use it, visit http://localhost:5173 and not port 3000"
          );
        }
      });

      routeChecked = true; // only runs once to avoid spam/overhead
    }
    next();
  },
};
