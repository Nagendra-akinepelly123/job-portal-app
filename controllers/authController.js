//packages
import bcrypt from "bcryptjs";

//files
import User from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    //destructuring
    const { name, email, password } = req.body;
    //vaidating
    // if (!name) {
    //   next("name is required");
    // }
    // if (!email) {
    //   next("email is required");
    // }
    // if (!password) {
    //   next("password is required");
    // }
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "User Alreay exist! Please Login",
    //   });
    // }

    const newUser = await User.create({ name, email, password });
    //token
    const token = newUser.createJWT();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      newUser: {
        name: newUser.name,
        email: newUser.email,
        location: newUser.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    next("Please fill All fields");
  }

  const user = await User.findOne({ name }).select("+password");
  if (!user) {
    next("Username or Password is invalid");
  }

  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    next("Username or Password is invalid");
  }
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
