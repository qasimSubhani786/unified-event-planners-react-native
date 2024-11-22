const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.sendJson(1, 200, "User found Successfully ", null);
  })
);

module.exports = router;
