import mongoose from "mongoose";

const task = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "TODO" },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Task", task);
