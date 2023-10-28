import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const brandModel = mongoose.model("Brand", brandSchema);
