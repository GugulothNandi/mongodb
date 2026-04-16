import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    dealId: String,
    contactName: String,
    contactPhone: String,
    hipaId: String,
    productInterest: Array,
    amount: Number,
    stage: String,
    priority: String,
    source: String,
    hubspotDealId: String,
  },
  { timestamps: true },
);

export default mongoose.model("Deal", dealSchema);
