import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "pomodoros.env" });
export default function connectToDB() {
  try {
    if (process.env.NODE_ENV === "DEV") {
      mongoose.connect(process.env.DB_CONN_DEV);
    } else {
      mongoose.connect(process.env.DB_CONN);
    }
    mongoose.connection.on("connected", () => {
      console.log("DB connection is successfull");
    });
    mongoose.connection.on("error", (err) => {
      console.error(err);
    });
  } catch (error) {
    throw error;
  }
}
