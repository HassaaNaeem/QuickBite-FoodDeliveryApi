import Joi from "joi";

const commonMessages = {
  "any.required": "This field is required",
  "string.empty": "Cannot be empty",
};

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .trim()
    .messages({
      "string.min": "Too short",
      ...commonMessages,
    }),
  email: Joi.string().email().trim().required().messages(commonMessages),
  password: Joi.string().min(8).required().messages(commonMessages),
  phone: Joi.string()
    .pattern(/^(?:\+92|0)3\d{9}$/)
    .required(),
  role: Joi.string()
    .valid("customer", "owner", "rider", "admin")
    .default("customer"),
  profileImageURI: Joi.string().optional(),
  googleId: Joi.string(),
});

export default userSchema;
