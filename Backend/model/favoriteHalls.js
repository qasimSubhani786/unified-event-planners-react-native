const Joi = require("joi");
const mongoose = require("mongoose");

const favoriteHall = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
const FavoriteHall = mongoose.model("FavoriteHall", favoriteHall);

// Validation Schema
const validateHall = param => {
  let schema = {
    hallId: Joi.objectId().required(),
    userId: Joi.objectId().required()
  };
  return Joi.validate(param, schema);
};

exports.FavoriteHall = FavoriteHall;
exports.validate = validateHall;
