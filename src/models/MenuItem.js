import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    min: 10,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  isVeg: { type: Boolean, default: false },
  imageURI: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  preparationTimeMinutes: {
    type: Number,
    required: true,
    min: 5,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
