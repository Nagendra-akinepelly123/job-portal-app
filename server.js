//API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

//security imports
import helmet from "helmet"; //it will protect the headers
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//files imports
import connectDB from "./config/db.js";
import testRoute from "./routes/testRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { version } from "mongoose";

//Dot Env Config
dotenv.config();

//mongo connection
connectDB();

//swagger api configuration
//swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      version: "1.0.0",
      description: "Node Expressjs Job portal Application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(express.json());
// app.use(xss());
// app.use(mongoSanitize());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

//home route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

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
