//imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import testRoute from "./routes/testRoutes.js";

//Dot Env Config
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//routes
app.get("/", (req, res) => {
  res.send("welcome to home route");
});
app.use("api/v1/test", testRoute);

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode at the port ${PORT}`
  );
});
