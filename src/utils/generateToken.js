import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "./AppError";

const generateAccessToken = (userId) => {
  const accessToken = {
    token: jwt.sign({ id: userId }, process.env.JWT_SECRET),
    expiresAt: process.env.JWT_EXPIRES_IN,
  };
  return accessToken;
};
const generateRefreshToken = (userId) => {
  const refreshToken = {
    token: jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET),
    expiresAt: process.env.JWT_REFRESH_EXPIRES_IN,
  };

  return refreshToken;
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
