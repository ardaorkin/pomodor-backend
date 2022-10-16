import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "pomodoros.env" });
export default function connectToDB() {
  try {
    mongoose.connect(process.env.DB_CONN);
  } catch (error) {
    throw error;
  }
}
