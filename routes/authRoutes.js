//packages
import express from "express";

//files
import { registerController } from "../controllers/authController.js";

//object
const router = express.Router();

router.post("/register", registerController);

//export
export default router;
