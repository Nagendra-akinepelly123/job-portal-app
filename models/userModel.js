import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
      minlength: [6, "Password length must be greater than 6 characters"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

//middlewares
userSchema.pre("save", async function (next) {
  // 1. Correctly CALL the function and check a specific field.
  // 2. The '!' negates the result: "If the 'password' field is NOT modified, then return."
  if (!this.isModified("password")) {
    return next(); // Exit early if password hasn't changed.
  }

  // This logic only runs if the password field IS modified (or the document is new).
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Pass control to the next middleware or save operation
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JWT
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SCRETE, {
    expiresIn: "1d",
  });
};
const User = mongoose.model("User", userSchema);

export default User;
