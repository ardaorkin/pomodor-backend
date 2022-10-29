import mongoose from "mongoose";
const { Schema } = mongoose;

const Teams = new Schema({
  name: { type: String, min: 3, required: true },
  members: { type: [mongoose.Types.ObjectId] },
  owner: { type: mongoose.Types.ObjectId, required: true },
});

export default Teams;
