import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  jsonUrl: String,
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", SessionSchema);
