import express from "express";
import restaurantRouter from "./src/routes/restaurantRoutes.js";

const app = express();

app.use(express.json());

function format(seconds) {
  function pad(s) {
    return (s < 10 ? 0 : "") + s;
  }
  let hours = Math.floor(seconds / (60 * 60));
  let mins = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(mins) + ":" + pad(secs);
}

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: format(process.uptime()),
  });
});

app.use("/api/v1/restaurants", restaurantRouter);

app.listen(3000, () => console.log("App started"));
