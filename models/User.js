import mongoose from "mongoose";

// create example schema

const UserSchema = new mongoose.Schema({
  First_name: {
    type: String,
    required: true,
  },

  Last_name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },
});

// Create a user model
const User = mongoose.model("User", UserSchema);

export default User;
