const express = require("express");
const router = express.Router();
const {User} = require("../model/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const asyncHandler = require("../middleware/asyncHandler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    let user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.sendJson(0, 400, "Invalid Email or Password", null);
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.sendJson(0, 400, "Invalid Email or Password", null);
    }
    const token = user.generateAuthToken({
      name: user.name,
      email: user.email
    });
    user.token = token;
    res.sendJson(1, 200, "User found Successfully ", _.pick(user, ["name", "email", "_id", "token", "isAdmin", "cnic", "phone"]));
  })
);

const validate = req => {
  let schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(req, schema);
};

module.exports = router;
