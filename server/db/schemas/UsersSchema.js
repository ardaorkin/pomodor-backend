import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersSchema = new Schema({
  username: { type: String, min: 3, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const emailPattern = new RegExp(
          /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
          "gm"
        );
        return emailPattern.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  first_name: String,
  last_name: String,
  role: String,
});

export default UsersSchema;
