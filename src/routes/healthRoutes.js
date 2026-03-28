import { Router } from "express";
const healthRouter = Router();

function format(seconds) {
  function pad(s) {
    return (s < 10 ? 0 : "") + s;
  }
  let hours = Math.floor(seconds / (60 * 60));
  let mins = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(mins) + ":" + pad(secs);
}

healthRouter.get("/", (req, res) => {
  res.json({
    status: "healthy",
    uptime: format(process.uptime()),
  });
});
export default healthRouter;
