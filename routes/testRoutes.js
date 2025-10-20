import express from "express";
import { testpost } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

router.post("/test-post", userAuth, testpost);

//export
export default router;
