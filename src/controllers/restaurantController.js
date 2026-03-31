import Restaurant from "../models/Restaurant.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const getRestaurants = catchAsync(async (req, res) => {
  const NUM_OF_RESTAURANTS_PER_PAGE = 10;
  const allRestaurants = await Restaurant.find({});
  const pageCount = Math.ceil(
    allRestaurants.length / NUM_OF_RESTAURANTS_PER_PAGE,
  );
  let page = parseInt(req.query.p); // ?p=2 (page 2)
  if (!page) {
    page = 1;
  }
  if (page > pageCount) page = pageCount;

  res.status(200).json({
    page,
    TotalPages: pageCount,
    restaurants: allRestaurants.slice(
      page * NUM_OF_RESTAURANTS_PER_PAGE - NUM_OF_RESTAURANTS_PER_PAGE,
      page * NUM_OF_RESTAURANTS_PER_PAGE,
    ), // 10 restaurants every page
  });
});

const createRestaurant = catchAsync(async (req, res) => {
  const {
    name,
    owner,
    description,
    cuisines,
    address,
    location,
    isOpen,
    rating,
    totalRatings,
    deliveryTimeMinutes,
    minimumOrder,
    plan,
    bannerImage,
    stripeConsumerId,
  } = req.body;

  // restaurants.push({ ...req.body, id: crypto.randomUUID() });
  const newRestaurant = await Restaurant.create({ ...req.body });

  res.status(201).json({
    message: "Restaurant created",
    restaurant: newRestaurant,
  });
});

const getRestauranById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const foundRestaurant = await Restaurant.findById(id);
  if (!foundRestaurant) throw new AppError("Restaurant not found", 404);
  res.status(200).json({
    restaurant: foundRestaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedRestaurant = await Restaurant.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true },
  );
  if (!updatedRestaurant) throw new AppError("Restaurant not found", 404);

  res.status(201).json({
    message: "Restaurant Updated",
    restaurant: updatedRestaurant,
  });
});

const deleteRestaurant = catchAsync(async (req, res) => {
  const id = req.params.id;
  const deletedRestaurant = await Restaurant.findOneAndDelete({ _id: id });

  if (!deletedRestaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  res.status(200).json({
    message: "Restaurant Deleted Successfully",
  });
});
export {
  getRestaurants,
  createRestaurant,
  getRestauranById,
  updateRestaurant,
  deleteRestaurant,
};
