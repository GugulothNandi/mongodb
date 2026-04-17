import AuditLog from "../models/AuditLog.js";

export const logAudit = async ({
  actor_type = "agent",
  actor_id,
  action,
  collection,
  document_id,
  changes,
  ip_address,
}) => {
  try {
    await AuditLog.create({
      actor_type,
      actor_id,
      action,
      collection,
      document_id,
      changes,
      ip_address,
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};
