const mongoose = require("mongoose");

const Joi = require("joi");

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    minLength: 3
  },
  shift: {
    type: String,
    enum: ["morning", "evening", "night"],
    required: true
  },
  headCount: {
    type: Number,
    default: 0
  },
  advanceAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  advancePercentage: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall"
  },
  status: {
    type: String,
    enum: ["pending", "completed", "booked"],
    required: true
  },
  aminities: [
    {
      aminity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aminity"
      },
      package: {
        type: String,
        enum: ["standard", "premium", "deluxe"]
      },
      addOn: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AddsOn"
        }
      ]
    }
  ],
  meals: {
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal"
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    addsOn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddsOn"
      }
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

const validateBooking = hall => {
  let schema = {
    date: Joi.date().required().min(3),
    shift: Joi.string().required().min(3),
    hall: Joi.objectId().required(),
    status: Joi.string().default("pending"),
    aminities: Joi.array()
      .items(
        Joi.object({
          amenity: Joi.objectId().required(),
          package: Joi.string().required(),
          addOn: Joi.array().default([])
        })
      )
      .default([]),
    aminities: Joi.array().default([]),
    meals: Joi.object({
      meal: Joi.objectId().required(),
      items: Joi.array().items(),
      addsOn: Joi.array().default([])
    })
  };
  return Joi.validate(hall, schema);
};
const confirmBooking = hall => {
  let schema = {
    headCount: Joi.number().required(),
    advancePercentage: Joi.number().required(),
    bookingId: Joi.objectId().required()
  };
  return Joi.validate(hall, schema);
};

exports.validate = validateBooking;
exports.confirmBookingValidate = confirmBooking;
exports.Booking = Booking;
