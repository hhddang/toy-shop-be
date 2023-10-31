import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  isAdmin: { type: Boolean, require: false, default: false },
});

export const userModel = mongoose.model("User", userSchema);
