import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  role: String,
});

export default UsersSchema;
