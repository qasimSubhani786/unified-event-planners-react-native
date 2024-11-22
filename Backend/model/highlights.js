const Joi = require("joi");
const mongoose = require("mongoose");

const hightlightsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  image: {
    type: String,
    required: true
  }
});
const Highlights = mongoose.model("Highlights", hightlightsSchema);

// Validation Schema
const validate = data => {
  let schema = {
    title: Joi.string().min(3).max(50).required()
  };
  return Joi.validate(data, schema);
};

exports.Highlights = Highlights;
exports.validate = validate;
