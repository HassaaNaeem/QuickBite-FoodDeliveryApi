import createApp from "./src/app.js";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const app = createApp();

const PORT = process.env.PORT || 3000;

const main = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("App is running on PORT" + PORT);
  });
};
main();
