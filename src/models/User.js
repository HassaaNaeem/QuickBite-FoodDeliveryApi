import { string } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 8,
      select: false,
    },
    phone: {
      type: String,
      minlength: 11,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "owner", "rider", "admin"],
    },
    profileImageURI: {
      type: String,
    },
    refreshTokens: [
      {
        token: {
          type: String,
          require: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          require: true,
        },
      },
    ],
    accessTokens: [
      {
        token: {
          type: String,
          require: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          require: true,
        },
      },
    ],
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
