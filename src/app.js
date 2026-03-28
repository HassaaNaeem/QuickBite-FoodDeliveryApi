import express from "express";
import restaurantRouter from "./routes/restaurantRoutes.js";
import healthRouter from "./routes/healthRoutes.js";

function createApp() {
  const app = express();
  app.use(express.json());

  app.use("/api/v1/health", healthRouter);

  app.use("/api/v1/restaurants", restaurantRouter);
  return app;
}
export default createApp;
