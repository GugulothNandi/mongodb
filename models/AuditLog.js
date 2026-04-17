import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actor_type: {
      type: String,
      enum: ["agent", "system", "customer", "admin"],
      default: "agent",
    },

    actor_id: String,

    action: {
      type: String,
      enum: ["create", "update", "delete", "view"],
    },

    model_name: String,

    document_id: String,

    changes: Object,

    ip_address: String,

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("AuditLog", auditLogSchema);
