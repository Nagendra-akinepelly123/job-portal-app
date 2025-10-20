//packages
import express from "express";

//files
import { createJob, getJobs } from "../controllers/jobController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-job", userAuth, createJob);
router.get("/get-jobs", userAuth, getJobs);

export default router;
