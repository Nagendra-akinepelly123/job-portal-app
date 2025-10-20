import User from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;

  const user = await User.findById({ _id: req.user.userId });
  if (!user) {
    return next("User not found");
  }

  if (user) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (location) {
    user.location = location;
  }

  await user.save();
  const token = user.createJWT();
  res.status(200).send({
    success: true,
    message: "Successfully Updated",
    user,
    token,
  });
};
