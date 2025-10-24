import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgWhite
    );
  } catch (error) {
    console.log(`Error!while connect to Database ${error}`.bgRed);
  }
};

export default connectDB;
