import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import moment from "moment";
import { format } from "morgan";

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
// PIPELINES IMPLEMENTATION

//JOB STATISTICS PIPELINE
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
      //stage-2
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

// //GET MONTHLY APPLICATIONS PIPELINE
export const monthlyApplicationController = async (req, res) => {
  const stats = await Job.aggregate([
    //stage-1
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    //stage-2
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalSubmitted: {
          $sum: 1,
        },
        interviewCount: {
          $sum: {
            $cond: [{ $eq: ["$status", "interview"] }, 1, 0],
          },
        },
        rejectionCount: {
          $sum: {
            $cond: [{ $eq: ["$status", "reject"] }, 1, 0],
          },
        },
        pendingCount: {
          $sum: {
            $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
          },
        },
      },
    },
    //stage-3
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $project: {
        _id: 0,

        totalSubmitted: 1,
        interviewCount: 1,
        rejectedCount: 1,
        pendingCount: 1,
        date: {
          $dateToString: {
            format: "%Y-%m",
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: 1,
              },
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    jobsApplied: stats.length,
    stats,
  });
};

// GET JOB STATUS OR POPULARITY PIPELINE
export const jobPopularityController = async (req, res) => {
  const jobStatus = await Job.aggregate([
    //stage - 1
    {
      $group: {
        _id: {
          company: "$company",
          position: "$position",
        },
        totalApplicants: {
          $sum: 1,
        },
      },
    },
    //stage-2
    {
      $sort: {
        totalApplicants: -1,
      },
    },
    //stage-3
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        totalApplicants: 1,
        company: "$_id.company",
        position: "$_id.position",
      },
    },
  ]);
  res.status(200).json({
    count: jobStatus.length,
    jobStatus,
  });
};
