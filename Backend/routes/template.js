const express = require("express");
const router = express.Router();

//to create a new user object
router.get("/", async (req, res) => {
  res.render("index", { title: "My Express APP", message: "Hellow World" });
});

module.exports = router;
