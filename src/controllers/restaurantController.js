const restaurants = [
  {
    id: "1",
    name: "Savour Foods",
    owner: "bilal@test.com", // replace with owner _id after seeding users
    description: "Famous for BBQ and desi karahi since 1995",
    cuisines: ["Pakistani", "BBQ", "Desi"],
    address: {
      street: "12 Main Boulevard",
      area: "Gulberg III",
      city: "Lahore",
      zip: "54000",
    },
    location: {
      type: "Point",
      coordinates: [74.3436, 31.5204], // [longitude, latitude]
    },
    isOpen: true,
    rating: 4.5,
    totalRatings: 238,
    deliveryTimeMinutes: 35,
    minimumOrder: 500,
    plan: "pro",
    bannerImage: "https://placehold.co/1200x400?text=Savour+Foods",
  },
  {
    id: "2",
    name: "Pizza Palace",
    owner: "bilal@test.com",
    description: "Wood-fired pizza and pasta, delivery in 30 minutes",
    cuisines: ["Italian", "Fast Food", "Pizza"],
    address: {
      street: "45 Liberty Market",
      area: "Gulberg",
      city: "Lahore",
      zip: "54000",
    },
    location: {
      type: "Point",
      coordinates: [74.3289, 31.5097],
    },
    isOpen: true,
    rating: 4.2,
    totalRatings: 175,
    deliveryTimeMinutes: 30,
    minimumOrder: 800,
    plan: "free",
    bannerImage: "https://placehold.co/1200x400?text=Pizza+Palace",
  },
  {
    id: "3",
    name: "Burger Barn",
    owner: "zara@test.com", // add zara as second owner if you want
    description: "Smash burgers, loaded fries, thick shakes",
    cuisines: ["American", "Burgers", "Fast Food"],
    address: {
      street: "78 MM Alam Road",
      area: "Gulberg II",
      city: "Lahore",
      zip: "54000",
    },
    location: {
      type: "Point",
      coordinates: [74.3356, 31.515],
    },
    isOpen: true,
    rating: 4.7,
    totalRatings: 412,
    deliveryTimeMinutes: 25,
    minimumOrder: 600,
    plan: "pro",
    bannerImage: "https://placehold.co/1200x400?text=Burger+Barn",
  },
  {
    id: "4",
    name: "Wok & Roll",
    owner: "zara@test.com",
    description: "Authentic Chinese dim sum, noodles and fried rice",
    cuisines: ["Chinese", "Asian", "Dim Sum"],
    address: {
      street: "33 DHA Phase 5",
      area: "DHA",
      city: "Lahore",
      zip: "54792",
    },
    location: {
      type: "Point",
      coordinates: [74.3908, 31.4816],
    },
    isOpen: false, // closed — good to test "open now" filter
    rating: 3.9,
    totalRatings: 89,
    deliveryTimeMinutes: 45,
    minimumOrder: 700,
    plan: "free",
    bannerImage: "https://placehold.co/1200x400?text=Wok+and+Roll",
  },
];

const getRestaurants = (req, res) => {
  const NUM_OF_RESTAURANTS_PER_PAGE = 3;
  const pageCount = Math.ceil(restaurants.length / NUM_OF_RESTAURANTS_PER_PAGE);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) page = pageCount;

  res.status(200).json({
    page,
    TotalPages: pageCount,
    restaurants: restaurants.slice(
      page * NUM_OF_RESTAURANTS_PER_PAGE - NUM_OF_RESTAURANTS_PER_PAGE,
      page * NUM_OF_RESTAURANTS_PER_PAGE,
    ), // 3 restaurants every page
  });
};

const createRestaurant = (req, res) => {
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
  } = req.body;

  restaurants.push({ ...req.body, id: crypto.randomUUID() });

  res.status(201).json({
    message: "Restaurant created",
  });
};

const getRestauranById = (req, res) => {
  const foundRestaurant = restaurants.find((res) => res.id == req.params.id);
  if (!foundRestaurant)
    return res.status(404).json({ message: "No Restaurant with this id" });
  res.status(200).json({
    restaurant: foundRestaurant,
  });
};

const updateRestaurant = (req, res) => {
  const foundRestaurant = restaurants.find((res) => res.id == req.params.id);
  if (!foundRestaurant)
    return res.status(404).json({ message: "No Restaurant with this id" });
  const updatedRestaurant = {
    ...foundRestaurant,
    ...req.body,
    id: req.params.id,
  };

  res.status(201).json({
    message: "Restaurant Updated",
    restaurant: updatedRestaurant,
  });
};

const deleteRestaurant = (req, res) => {
  restaurants.filter((res) => res.id != req.params.id);
  res.status(204).json({
    message: "Restaurant Deleted Successfully",
  });
};
export {
  getRestaurants,
  createRestaurant,
  getRestauranById,
  updateRestaurant,
  deleteRestaurant,
};
