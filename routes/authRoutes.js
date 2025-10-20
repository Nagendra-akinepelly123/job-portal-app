//packages
import express from "express";

//files
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//object
const router = express.Router();

//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//export
export default router;
