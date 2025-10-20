import Job from "../models/jobModel.js";

export const createJob = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return next("Please!fill all fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getJobs = async (req, res, next) => {
  const job = await Job.find({ createdBy: req.user.userId });
  res.status(200).send({
    success: true,
    totalJobs: job.length,
    job,
  });
};
