import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password length must be greater that 6 characters"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
