import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../utils/AppError";
import User from "../models/User";
import { verifyAccessToken } from "../utils/generateToken";
import catchAsync from "../utils/catchAsync";

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers?.authorization &&
    req.headers?.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) throw new AppError("Invalid Token", 401);

  const user = await User.findById(decoded._id);
  if (!user) throw new AppError("User not found", 404);

  req.user = user;
  next();
});

export default protect;
