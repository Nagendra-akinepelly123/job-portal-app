import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

//GET USER

//UPDATE USER
router.patch("/update-user", userAuth, updateUserController);

export default router;
