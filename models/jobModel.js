import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required field"],
    },
    position: {
      type: String,
      required: [true, "Position name is required field"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contarct based"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
