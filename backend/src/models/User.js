import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

export default mongoose.model("User", user);
