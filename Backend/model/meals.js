const Joi = require("joi");
const mongoose = require("mongoose");
const {addOnSchema} = require("./addsOn");

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  details: {
    type: String,
    minlength: 5
  },
  price: {
    type: Number,
    required: true
  },
  offer: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  image: {
    type: String,
    required: true
  },
  mealItems: [
    {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        items: [
          {
            type: new mongoose.Schema({
              item: {
                type: String,
                required: true
              }
            })
          }
        ]
      })
    }
  ],
  addsOn: [
    {
      type: addOnSchema,
      required: true
    }
  ]
});

const Meal = mongoose.model("Meal", mealSchema);

//Validation Schema
const validateMeal = meal => {
  let schema = {
    title: Joi.string().min(5).max(50).required(),
    details: Joi.string(),
    price: Joi.number().required(),
    offer: Joi.string().min(5).max(255).required(),
    mealItems: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        items: Joi.array().items(
          Joi.object({
            item: Joi.string().required()
          })
        )
      })
    ),
    addsOn: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required()
      })
    )
  };
  return Joi.validate(meal, schema);
};

exports.Meal = Meal;
exports.validate = validateMeal;
