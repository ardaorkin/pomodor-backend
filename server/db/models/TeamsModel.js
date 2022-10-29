import mongoose from "mongoose";
import TeamsSchema from "../schemas/TeamsSchema";

const TeamsModel = mongoose.model("Teams", TeamsSchema);
export default TeamsModel;
