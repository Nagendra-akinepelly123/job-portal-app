import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import moment from "moment";

//CREATE JOBS LOGIC
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return next("Please!fill all fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

//GET JOBS LOGIC
export const getAllJobsController = async (req, res, next) => {
  const job = await Job.find({ createdBy: req.user.userId });
  res.status(200).send({
    success: true,
    totalJobs: job.length,
    job,
  });
};

//UPDATE JOBS LOGIC
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return next("please provide all fields");
  }

  const job = await Job.findOne({ _id: id });
  if (!job) {
    return next("Job Not found");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    return next("Your Not Authorized to update this job");
  }

  const updatedJob = await Job.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updatedJob });
};

//DELETE JOB ROUTE
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findOne({ _id: id });
  if (!job) {
    return next(`No job Found with This ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    return next("Your not Authorized to delete this job");
  }

  await Job.findByIdAndDelete({ _id: id });

  res.status(200).json({ message: "Success Job is deleted" });
};

export const jobStatsController = async (req, res) => {
  const stats = await Job.aggregate([
    {
      //stage-1
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId), // Selects documents with this user ID
        // status: { $ne: "reject" }, // And the status is not 'rejected'
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    reject: stats.reject || 0,
  };

  //monthly application
  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({
    totalJobs: stats.length,
    defaultStats,
    monthlyApplications,
  });
};
