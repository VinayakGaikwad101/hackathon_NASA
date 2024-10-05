import mongoose from "mongoose";

const connectDB = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
