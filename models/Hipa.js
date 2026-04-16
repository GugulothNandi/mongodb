import mongoose from "mongoose";

const hipaSchema = new mongoose.Schema(
  {
    _id: String,
    customer_id: String,
    status: String,
    coverageScore: Number,
    gaps: Array,
    recommendations: Array,
    reportUrl: String,
  },
  { timestamps: true },
);

export default mongoose.model("Hipa", hipaSchema);
