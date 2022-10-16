import mongoose from "mongoose";
import PomodorosSchema from "../schemas/PomodorosSchema";
const PomodorosModel = mongoose.model("Pomodoros", PomodorosSchema);
export default PomodorosModel;
