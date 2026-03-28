import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "start",
  });
});

app.listen(3000, () => console.log("App started"));
