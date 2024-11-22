const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  cnic: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 13,
    unique: true
  },
  stripeCustomerId: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11
  },
  otp: {
    type: String
  }
});

userSchema.methods.generateAuthToken = function (userParam) {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin, ...userParam}, config.get("jwtPrivateKey")); // here we are getting value from the environmental variables to set the Env-Variables export varName = secretkey
  return token;
};

const User = mongoose.model("User", userSchema);

//Validation Schema
const validateUser = user => {
  let schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    cnic: Joi.string().min(13).max(13).required(),
    phone: Joi.string().min(11).max(11).required(),
    isAdmin: Joi.boolean().required()
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
