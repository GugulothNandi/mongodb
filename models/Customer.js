import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: String,
  city: String,
  state: String,
  pincode: String,
  country: { type: String, default: "IN" },
});

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    phone: { type: String, unique: true, required: true },

    email: String,

    dob: Date,

    gender: {
      type: String,
      enum: ["M", "F", "Other"],
    },

    address: addressSchema,

    source: {
      venture_id: String,
      channel_id: String,
      agent_id: String,
    },

    lifecycle_stage: {
      type: String,
      enum: [
        "awareness",
        "needs_analysis",
        "pipeline",
        "onboarding",
        "active",
        "renewal",
        "churned",
      ],
      default: "awareness",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
