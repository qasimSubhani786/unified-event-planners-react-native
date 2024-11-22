const express = require("express");
const app = express();
const winston = require("winston");
const config = require("config");
const startupDebugger = require("debug")("app:startup");

require("./startup/db")(app);
require("./startup/routes")(app);
require("./startup/validation")();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: JwtPrivateKey is not defined");
  process.exit(1);
}
if (app.get("env") === "development") {
  startupDebugger("Hellow world"); // just for debug You have to Set export DEGUB=app:*
}

// console.log("APPLICATION jwtPrivateKey", config.get("jwtPrivateKey")); // for access enviromental varibales
