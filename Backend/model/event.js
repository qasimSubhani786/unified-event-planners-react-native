const Joi = require("joi");
const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema({
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
  },
  eventType: {
    type: String,
    enums: ["birthay", "walima"]
  }
});
const EventType = mongoose.model("Events", eventTypeSchema);

// Validation Schema
const validateEvent = customer => {
  let schema = {
    title: Joi.string().min(3).max(50).required(),
    eventType: Joi.string().min(3).max(50).required()
  };
  return Joi.validate(customer, schema);
};

exports.Events = EventType;
exports.validate = validateEvent;
