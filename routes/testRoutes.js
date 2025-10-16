import express from "express";
import { testpost } from "../controllers/testController.js";

//router object
const router = express.Router();

router.post("/test-post", testpost);

//export
export default router;
