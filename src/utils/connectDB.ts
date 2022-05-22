import mongoose from "mongoose";
import config from "config";

export async function connectDB() {
  try {
    await mongoose.connect(config.get("dbUrl"));
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}
