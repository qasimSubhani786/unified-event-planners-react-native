const mongoose = require("mongoose");

const addOnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const AddsOn = mongoose.model("AddsOn", addOnSchema);

exports.AddsOn = AddsOn;
exports.addOnSchema = addOnSchema;
