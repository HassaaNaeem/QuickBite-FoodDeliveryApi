import express from "express";
import restaurantRouter from "./routes/restaurantRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import globalErrorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";

function createApp() {
  const app = express();
  app.use(express.json());

  app.use("/api/v1/health", healthRouter);

  app.use("/api/v1/restaurants", restaurantRouter);
  app.use("/api/v1/auth", authRouter);

  app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
  });

  app.use(globalErrorHandler);

  return app;
}

export default createApp;
