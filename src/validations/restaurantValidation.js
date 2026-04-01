import Joi from "joi";

const commonMessages = {
  "any.required": "This field is required",
  "string.empty": "Cannot be empty",
};

const restaurantSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.min": "Too short",
      ...commonMessages,
    }),
  owner: Joi.string().length(24).hex(),
  description: Joi.string()
    .min(10)
    .max(150)
    .required()
    .messages(commonMessages),
  cuisines: Joi.array().items(Joi.string().trim().min(2)).min(1).required(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  address: Joi.string().min(8).trim().required(),
  isOpen: Joi.boolean().default(true),
  rating: Joi.number().min(0).max(5).messages({
    "number.min": "Rating can't be below 0",
    "number.max": "Rating can't be above 5'",
  }),
  totalRatings: Joi.number().min(0),
  deliveryTimeMinutes: Joi.number().min(5).max(120).default(30),
  minimumOrder: Joi.number().default(250),
  plan: Joi.string().valid("free", "pro").default("free"),
  bannerImage: Joi.string().allow("").optional(),
  stripeCustomerId: Joi.string().allow("").optional(),
});

export default restaurantSchema;
