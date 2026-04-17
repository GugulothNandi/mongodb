import mongoose from "mongoose";

const hipaSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    customer_id: {
      type: String,
      required: false,
    },

    venture_id: {
      type: String,
      required: true,
    },

    agent_id: {
      type: String,
    },

    input_type: {
      type: String,
      enum: ["camera", "pdf", "manual"],
      required: true,
    },

    status: {
      type: String,
      enum: ["processing", "complete", "failed"],
      default: "processing",
    },

    coverage_score: Number,

    gaps: [
      {
        severity: String,
        title: String,
        description: String,
        riskLabel: String,
      },
    ],

    recommendations: [
      {
        title: String,
        description: String,
        premiumIncrement: Number,
      },
    ],

    total_recommended_premium: Number,

    report_url: String,

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Hipa", hipaSchema);
