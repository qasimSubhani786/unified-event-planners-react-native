const mongoose = require("mongoose");

const Joi = require("joi");

const hallSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  address: {
    type: String,
    required: true,
    minLength: 3
  },
  eventType: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Events",
    default: []
  },
  images: {
    type: Array,
    default: []
  },
  rating: Number,
  offer: String,
  majorImage: {
    type: String
  },
  isFav: {
    type: Boolean,
    default: false
  },
  location: {
    type: [Number], // Array of numbers
    index: "2dsphere" // Enable geospatial indexing for location
  },
  desc: {
    type: String,
    required: true,
    minLength: 10
  },
  capacity: {
    type: Number,
    required: true,
    min: 0
  },
  socialMedia: [
    {
      platform: {
        type: String,
        required: true
      },
      handle: {
        type: String,
        required: true
      },
      socialId: {
        type: Number,
        enums: [1, 2, 3, 4, 5],
        required: true
      }
    }
  ],
  reviews: [
    {
      userName: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      details: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  contactNo: {type: String, required: true},
  aminities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aminity"
    }
  ],
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal"
    }
  ],
  bookingId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  }
});

const Hall = mongoose.model("Hall", hallSchema);

const validateHall = hall => {
  let schema = {
    title: Joi.string().required().min(3),
    address: Joi.string().required().min(3),
    images: Joi.array().default([]),
    rating: Joi.number(),
    offer: Joi.string(),
    isFav: Joi.boolean().default(false),
    location: Joi.array().items(Joi.number()).length(2),
    desc: Joi.string().required().min(10),
    capacity: Joi.number().required(),
    socialMedia: Joi.array().items(
      Joi.object({
        platform: Joi.string().required(),
        handle: Joi.string().required(),
        socialId: Joi.number().required()
      })
    ),
    reviews: Joi.array().items(
      Joi.object({
        userName: Joi.string().required(),
        rating: Joi.number().required(),
        details: Joi.string().required(),
        date: Joi.date().default(Date.now, "Default value for date")
      })
    ),
    contactNo: Joi.string(),
    aminities: Joi.array().default([]),
    meals: Joi.array().default([]),
    bookingId: Joi.array().default([]),
    eventType: Joi.array().items(Joi.objectId().required())
  };
  return Joi.validate(hall, schema);
};

exports.validate = validateHall;
exports.Hall = Hall;
