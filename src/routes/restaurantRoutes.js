import { Router } from "express";
const restaurantRouter = Router();

import {
  getRestaurants,
  createRestaurant,
  getRestauranById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

restaurantRouter.get("/", getRestaurants);
restaurantRouter.post("/", createRestaurant);
restaurantRouter.get("/:id", getRestauranById);
restaurantRouter.patch("/:id", updateRestaurant);
restaurantRouter.delete("/:id", deleteRestaurant);

export default restaurantRouter;
