const mongoose = require("mongoose");
const Joi = require("joi");
const {addOnSchema} = require("./addsOn");

const aminitiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  package: {
    type: [String],
    enum: ["standard", "premium", "deluxe"],
    required: true
  },
  offer: {
    type: String,
    required: true
  },
  addsOn: [
    {
      type: addOnSchema
    }
  ]
});

const Aminity = mongoose.model("Aminity", aminitiesSchema);

const validateAminity = item => {
  let schema = {
    title: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    offer: Joi.string().min(5).max(255).required(),
    details: Joi.string().min(5).required(),
    package: Joi.array().items(Joi.string()).required(),
    addsOn: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required()
      })
    )
  };
  return Joi.validate(item, schema);
};

exports.Aminity = Aminity;
exports.validate = validateAminity;
