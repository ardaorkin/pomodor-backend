import mongoose from "mongoose";
const { Schema } = mongoose;

const PomodorosSchema = new Schema({
  date: { type: Date, required: true },
  user_id: { type: mongoose.ObjectId, required: true },
  length: { type: Number, required: true },
});

export default PomodorosSchema;
