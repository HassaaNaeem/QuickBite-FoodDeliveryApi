import mongoose from "mongoose";

const riderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  currentLocation: {
    type: {
      type: "String",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (val) => val.length === 2,
        message: "Coordinates must be [lng, lat]",
      },
    },
    required: true,
  },
  activeOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  totalDeliveries: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

riderSchema.index({ currentLocation: "2dsphere" });

const Rider = mongoose.model("Rider", riderSchema);
export default Rider;
