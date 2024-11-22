const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const objectIdSchema = Joi.object({
  id: JoiObjectId().required()
});

const validateObjectId = id => {
  const {error, value} = objectIdSchema.validate({id});
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.id;
};

exports.validateObjectId = validateObjectId;
