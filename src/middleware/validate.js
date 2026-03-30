import AppError from "../utils/AppError.js";
function validate(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false },
    );
    if (error) {
      next(
        new AppError(
          error.details.map((detail) => detail.message).join(", "), // joi will only return first occured error otherwise
          400,
        ),
      );
      return;
    }
    req.data = value;
    next();
  };
}
export default validate;
