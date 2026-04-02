import validate from "../middleware/validate";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../validations/userValidation";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/generateToken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, phone, role, profileImageURI } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  validate(userSchema);
  const hashedPassword = await bcrypt.hash(password, 3);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    profileImageURI,
    token,
  });
  const refreshToken = generateRefreshToken(newUser._id);
  const accessToken = generateAccessToken(newUser._id);

  newUser.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      profileImageURI: newUser.profileImageURI,
    },
    accessToken,
    refreshToken,
    expiresIn: 120,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.finOne({ email }).select("+password");
  if (!user) {
    throw new AppError("User doesn't exists", 404);
  }

  const matchedPassword = bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new AppError("Incorrct password", 401);
  }

  const refreshToken = generateRefreshToken(newUser._id);
  const accessToken = generateAccessToken(newUser._id);

  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await user.save();
  res.status(201).json({
    success: true,
    message: "Login Successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
    expiredIn: 120,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new AppError("Refresh token is required", 401);

  let decoded;
  try {
    decoded = verifyAccessToken(refreshToken);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findOne({ id: decoded._id });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const tokenExists = user.refreshTokens.some(
    (t) => (t.token = refreshToken && Date.now() < t.expiresAt),
  );

  if (!tokenExists)
    throw new AppError("Refresh token is invalid or has been revoked", 401);

  user.refreshTokens = user.refreshTokens.filter(
    (t) => t.token == refreshToken,
  );
  await user.save();

  const newAccessToken = generateAccessToken(user._id);
  res.status(201).json({
    success: true,
    message: "Token refreshed successfullyy",
    data: {
      accessToken: newAccessToken,
      expiresIn: 120,
    },
  });
});

export { registerUser, loginUser, refreshToken };
