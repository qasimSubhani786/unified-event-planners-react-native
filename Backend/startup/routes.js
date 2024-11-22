const {endPoints} = require("../common/endpoints");
const user = require("../routes/users");
const auth = require("../routes/auth");
const halls = require("../routes/hall");
const aminities = require("../routes/aminities");
const template = require("../routes/template");
const events = require("../routes/events");
const meals = require("../routes/meals");
const bookings = require("../routes/booking");
const express = require("express");
const error = require("../middleware/error");
const reviews = require("../routes/reviews");
const payments = require("../routes/payments");
const highlights = require("../routes/highlights");
const test = require("../routes/test");
const responseHandler = require("../middleware/responseHandler");

module.exports = function (app) {
  app.use(express.json()); // to parse the Json Object From The Data-base
  app.use(express.urlencoded({extended: true}));
  app.use(responseHandler);
  app.use(endPoints.user, user);
  app.use(endPoints.home, test);
  app.use(endPoints.auth, auth);
  app.use(endPoints.template, template);
  app.use(endPoints.halls, halls);
  app.use(endPoints.aminity, aminities);
  app.use(endPoints.event, events);
  app.use(endPoints.meal, meals);
  app.use(endPoints.payments, payments);
  app.use(endPoints.reviews, reviews);
  app.use(endPoints.booking, bookings);
  app.use(endPoints.highlights, highlights);
  app.use(error);
  // app.set("view engine", "pug");  // for rendering html file
  // app.set("views", "../views");
};
