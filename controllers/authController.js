//files
import User from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    //destructuring
    const { name, email, password } = req.body;
    //vaidating
    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Alreay exist! Please Login",
      });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
