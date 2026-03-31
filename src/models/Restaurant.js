import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  cuisines: {
    type: [String],
    default: [],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (val) => val.length === 2,
        message: "Coordinates must be [lng, lat]",
      },
    },
  },
  address: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  deliveryTimeMinutes: {
    type: Number,
    min: 10, // minimum: 10 mins
    max: 120, // maximum: 120 mins
    default: 30,
  },
  minimumOrder: {
    type: Number,
    default: 250, // order in rs for now
  },
  plan: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },
  bannerImage: {
    type: String,
  },
  stripeCustomerId: {
    type: String,
  },
});

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
