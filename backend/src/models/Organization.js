import mongoose from "mongoose";

const organization = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, enum: ["FREE", "PRO"], default: "FREE" },
  taskLimit: { type: Number, default: 5 },
});

export default mongoose.model("Organization", organization);
