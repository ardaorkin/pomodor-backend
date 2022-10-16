import mongoose from "mongoose";
import UsersSchema from "../schemas/UsersSchema";

const UsersModel = mongoose.model("Users", UsersSchema);
export default UsersModel;
