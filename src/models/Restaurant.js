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
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  cuisines: [String],
  location: {
    type: {
      type: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    required: true,
    index: "2dsphere",
  },
  address: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  isOpen: {
    type: boolean,
    default: true,
  },
  rating: {
    type: Number,
    min: 1,
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
  },
  bannerImage: {
    type: String,
    required: true,
  },
  stripeCustomerId: {
    type: String,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
