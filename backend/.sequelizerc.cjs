const path = require("path");

module.exports = {
  config: path.resolve("app", "config.js"),
  "models-path": path.resolve("app", "models"),
  "migrations-path": path.resolve("migrations"),
  "seeders-path": path.resolve("app", "seeders"),
};
