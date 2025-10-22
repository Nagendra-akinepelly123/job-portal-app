//packages
import express from "express";

//files
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//GET JOBS || GET
router.post("/create-job", userAuth, createJobController);

//POST JOBS  || POST
router.get("/get-jobs", userAuth, getAllJobsController);

//UPDATE JOBS || PUT OR PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//JOB STATS || GET
router.get("/job-stats", userAuth, jobStatsController);

export default router;
