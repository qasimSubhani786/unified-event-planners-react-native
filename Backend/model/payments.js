const mongoose = require("mongoose");

const Joi = require("joi");

const paymentSchema = new mongoose.Schema({
  stripePaymentMethodId: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
    dropDups: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true,
    dropDups: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  totalBookingAmount: {
    type: Number,
    required: true
  },
  advancePercentage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed", "booked"],
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

const validatePayment = hall => {
  let schema = {
    stripePaymentMethodId: Joi.string().required(),
    userId: Joi.objectId().required(),
    bookingId: Joi.objectId().required(),
    amountPaid: Joi.number().required(),
    totalBookingAmount: Joi.number().required(),
    advancePercentage: Joi.number().required(),
    status: Joi.string().required(),
    createdDate: Joi.date()
  };
  return Joi.validate(hall, schema);
};

exports.validatePayment = validatePayment;
exports.Payment = Payment;
