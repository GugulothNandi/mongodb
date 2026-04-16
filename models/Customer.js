import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, unique: true },
    email: String,
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
