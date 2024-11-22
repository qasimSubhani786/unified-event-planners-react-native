const express = require("express");
const router = express.Router();
const {Booking, validate, confirmBookingValidate} = require("../model/booking");
const _ = require("lodash");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const {User} = require("../model/user");
const {Payment, validatePayment} = require("../model/payments");
const Joi = require("joi");
const config = require("config");
const {Hall} = require("../model/hall");
const {validateObjectId} = require("../model/validateObjId");
const {AVAILABLE_SLOTS, NO_AVAILABLE_DATE_MSG, AVAILABLE_DATE_MSG} = require("../common/constants");
const stripe = require("stripe")(config.get("stripKey"));

const validateHallAvailability = item => {
  let schema = {
    toDate: Joi.string().required(),
    fromDate: Joi.string().required(),
    hallId: Joi.objectId().required()
  };
  return Joi.validate(item, schema);
};

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

router.post(
  "/add-booking",
  auth,
  asyncHandler(async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    const filter = {user: req.user._id, date: req?.body?.date, shift: req?.body?.shift}; // The filter criteria to find the record
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};
    const booking = await Booking.findOneAndUpdate(filter, req.body, options);
    booking.user = req.user._id;
    res.sendJson(1, 200, "Booking Created Successfully ", booking);
  })
);
//to confirm a booking object
router.post(
  "/confirm-booking",
  auth,
  asyncHandler(async (req, res) => {
    const {error} = confirmBookingValidate(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    const isConfirmScreen = req?.query?.isConfirmationScreen;
    const headCount = req?.body?.headCount;
    const advancePercent = req?.body?.advancePercentage / 100;
    const bookingId = req?.body?.bookingId;
    const booking = await Booking.findOne({user: req.user._id, _id: bookingId})
      .select({_id: 0, bookingId: "$_id", date: 1, shift: 1, isActive: 1, status: 1, "meals.items": 1})
      .populate({
        path: "hall",
        select: {title: 1, capacity: 1, _id: 0},
        populate: {
          path: "meals",
          select: {_id: 0, mealItems: 1}
        }
      })
      .populate({path: "meals.meal", select: {price: 1, _id: 0, mealId: "$_id"}})
      .populate({path: "meals.addsOn", select: {price: 1, _id: 0, mealAddOnId: "$_id", title: 1}})
      .populate({
        path: "aminities.aminity",
        select: {
          title: 1,
          price: 1,
          _id: 0,
          aminityId: "$_id"
        }
      })
      .populate({
        path: "aminities.addOn",
        select: {
          title: 1,
          price: 1,
          _id: 0,
          aminityAddOnId: "$_id"
        }
      })
      .lean();
    const selectedMealItemsId = booking?.meals?.items;
    const selectedMealItems = [];
    const hallMeals = booking?.hall?.meals;
    // Below Function Will return User Menu Selected Meal-Items
    for (let i = 0; i < hallMeals.length; i++) {
      const {mealItems} = hallMeals[i];
      if (selectedMealItems.length === 0) {
        for (let j = 0; j < mealItems.length; j++) {
          const {items, title} = mealItems[j];
          const selectedMealItemsIdStringy = selectedMealItemsId.map(element => element.toString());
          const mealItem = items?.find(({_id}) => selectedMealItemsIdStringy.includes(_id.toString()));
          if (mealItem) {
            selectedMealItems.push({title, selectedItem: mealItem.item});
          }
        }
      } else {
        break;
      }
    }
    const standard = 1;
    const premium = 1.5;
    const deluxe = 1.75;
    const mealPrice = booking.meals.meal.price;
    const mealAddOn = booking.meals.addsOn;
    let mealAddOnPrice = 0;
    let aminityPrice = 0;
    let aminityAddOnPrice = 0;
    for (let i = 0; i < mealAddOn.length; i++) {
      const element = mealAddOn[i];
      mealAddOnPrice += element.price;
    }
    const aminities = booking.aminities;
    for (let i = 0; i < aminities.length; i++) {
      const {aminity, addOn, package: currentPackage} = aminities[i];
      for (let j = 0; j < addOn.length; j++) {
        const element = addOn[j];
        aminityAddOnPrice += element.price;
      }
      if (currentPackage === "premium") {
        aminity.price = aminity.price * premium;
      } else if (currentPackage === "deluxe") {
        aminity.price = aminity.price * deluxe;
      }
      aminityPrice += aminity.price;
    }

    if (isConfirmScreen) {
      const aminityAdsOnlist = _.flatMap(booking?.aminities, aminity => _.map(aminity.addOn, ({title, price}) => ({title, price})));
      let confirmationBookingData = {
        date: booking?.date,
        shift: booking?.shift,
        mealItems: selectedMealItems,
        mealAddsOn: booking?.meals?.addsOn,
        aminities: _.map(booking?.aminities, ({aminity}) => aminity),
        aminityAdsOn: aminityAdsOnlist,
        mealTotal: mealPrice + mealAddOnPrice,
        amenityTotal: aminityPrice + aminityAddOnPrice,
        hallName: booking.hall?.title,
        hallCapacity: booking.hall?.capacity,
        isAvailableForBooking: booking.isActive
      };
      res.sendJson(1, 200, "Confirmation Screen Data", confirmationBookingData);
      return;
    } else {
      const totalAmount = mealPrice * headCount + mealAddOnPrice * headCount + aminityPrice + aminityAddOnPrice;
      const advanceAmount = totalAmount * advancePercent;
      const remainingAmount = totalAmount - advanceAmount;
      const bookingUpdate = await Booking.updateOne(
        {_id: bookingId},
        {
          $set: {
            headCount: headCount,
            advanceAmount: advanceAmount,
            remainingAmount: remainingAmount,
            totalAmount: totalAmount,
            advancePercentage: req.body.advancePercentage
          }
        }
      );
      res.sendJson(1, 200, "Your Booking has been Updated Successfully! but still in pending state you need to pay your payment first", bookingUpdate);
    }
  })
);

router.post(
  "/payment-sheet",
  auth,
  asyncHandler(async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    // check if it is already a customer or not
    let customerId;
    const userId = req.user._id;
    const user = await User.findOne({_id: userId}).lean();
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        name: req.user.name,
        email: req.user.email,
        metadata: {
          userId: userId.toString()
        }
      });
      await User.updateOne(
        {_id: userId},
        {
          $set: {
            stripeCustomerId: customer.id
          }
        }
      );
      customerId = customer.id;
    } else {
      customerId = user.stripeCustomerId;
    }
    const bookingId = req.body.bookingId;
    if (!bookingId) {
      res.sendJson(0, 404, "please send bookingID", null);
    }
    const {advanceAmount, totalAmount, advancePercentage} = await Booking.findOne({_id: bookingId}).lean();
    const ephemeralKey = await stripe.ephemeralKeys.create({customer: customerId}, {apiVersion: "2022-11-15"});
    const paymentIntent = await stripe.paymentIntents.create({
      amount: advanceAmount * 100,
      currency: "usd",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true
      }
    });
    const pendingPayment = {
      stripePaymentMethodId: paymentIntent.id,
      userId: userId,
      bookingId: bookingId,
      amountPaid: advanceAmount,
      totalBookingAmount: totalAmount,
      advancePercentage: advancePercentage,
      status: "pending"
    };
    const {error} = validatePayment(pendingPayment);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    try {
      const filter = {userId: req.user._id, bookingId: bookingId}; // The filter criteria to find the record
      const options = {upsert: true, new: true, setDefaultsOnInsert: true};
      const booking = await Payment.findOneAndUpdate(filter, pendingPayment, options);
    } catch (error) {
      res.sendJson(1, 500, "Server Error ", error);
    }

    const paymentObj = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId
    };
    res.sendJson(1, 200, "Payment Created on Stripe But its InComplete ", paymentObj);
  })
);

router.get(
  "/update-booking-status",
  auth,
  asyncHandler(async (req, res) => {
    const bookingId = req.query.bookingId;
    if (!bookingId) {
      res.sendJson(0, 404, "please send bookingID", null);
    }
    const {hall, date, shift} = await Booking.findOne({_id: bookingId}).lean();
    const paymentPromise = Payment.findOneAndUpdate({bookingId: bookingId}, {$set: {status: "completed"}}).lean();
    const bookingPromise = Booking.findOneAndUpdate({_id: bookingId}, {$set: {status: "booked"}}).lean();
    const deactivateBookingPromise = Booking.updateMany({date: date, shift: shift}, {$set: {isActive: false}}).lean();
    const hallPromise = Hall.updateOne({_id: hall}, {$push: {bookingId: bookingId}}).lean();
    const [payment, booking, updatedHall] = await Promise.all([paymentPromise, bookingPromise, hallPromise, deactivateBookingPromise]);
    res.sendJson(1, 200, "Booking Confirmed Successsfully! ", {booking, payment, updatedHall});
  })
);

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const booking = await Booking.find({user: req.user._id})
      .select({_id: 0, bookingId: "$_id", date: 1, status: 1, shift: 1, headCount: 1, isActive: 1, totalAmount: 1, advanceAmount: 1})
      .populate({path: "hall", select: {title: 1, _id: 0, hallId: "$_id", address: 1, contactNo: 1,location:1}})
      .lean();
    res.sendJson(1, 200, "Booking Created Successfully ", booking);
  })
);

router.post(
  "/check-availability",
  asyncHandler(async (req, res) => {
    const {error} = validateHallAvailability(req.body);
    if (error) {
      return res.sendJson(0, 400, error.details[0].message, null);
    }
    const hallId = req.body.hallId;
    const toDate = req.body.toDate;
    const fromDate = req.body.fromDate;
    const toDate_ = new Date(toDate);
    const fromDate_ = new Date(fromDate);
    const datesBetween = getDatesInRange(toDate_, fromDate_);

    let availableHallSlots = [];
    for (let i = 0; i < datesBetween.length; i++) {
      const currentDate = datesBetween[i];
      for (let j = 0; j < AVAILABLE_SLOTS.length; j++) {
        const shift = AVAILABLE_SLOTS[j];
        availableHallSlots.push({
          shift: shift.shift,
          time: shift.time,
          date: currentDate
        });
      }
    }
    const hall = await Hall.findOne({_id: hallId}).lean();
    if (!hall.bookingId || hall.bookingId < 1) {
      // there is no booking for this hall
      res.sendJson(1, 200, "There is no booking available for this hall previously ", availableHallSlots);
    } else {
      const bookings = await Booking.find({_id: {$in: hall.bookingId}}).lean();
      const availableHallBookingSlotsForUser = _.filter(availableHallSlots, obj1 => {
        const matchingObj = _.find(bookings, obj2 => {
          return obj1.shift == obj2.shift && obj1.date.toISOString().split("T")[0] == obj2.date.toISOString().split("T")[0];
        });
        return !matchingObj;
      });
      const responseMessage = availableHallBookingSlotsForUser.length === 0 ? NO_AVAILABLE_DATE_MSG : AVAILABLE_DATE_MSG;
      res.sendJson(1, 200, responseMessage, availableHallBookingSlotsForUser);
    }
  })
);

router.delete(
  "/delete-booking",
  auth,
  asyncHandler(async (req, res) => {
    let id = req?.query?.bookingId;
    id = validateObjectId(id);
    let result = await Booking.findByIdAndRemove(id);
    if (result) {
      res.sendJson(1, 200, "Booking deleted successfully", result);
    } else {
      res.sendJson(0, 404, "Dose not exist!", null);
    }
  })
);

// get userinfo
router.get(
  "/me",
  auth,
  asyncHandler((req, res) => {
    res.sendJson(1, 200, "User data found", _.pick(req.user, ["name", "email", "_id"]));
  })
);

module.exports = router;
