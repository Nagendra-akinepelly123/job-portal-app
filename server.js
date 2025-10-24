// packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

//files imports
import connectDB from "./config/db.js";
import testRoute from "./routes/testRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//Dot Env Config
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

//validation middlewares
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(5000, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode at the port 5000`.bgWhite
  );
});
