import Hipa from "../models/Hipa.js";
import { v4 as uuidv4 } from "uuid";

export const analyseHipa = async (req, res) => {
  const hipaId = "hipa_" + uuidv4();

  const hipa = await Hipa.create({
    _id: hipaId,
    customer_id: req.body.customerId,
    status: "processing",
  });

  res.json({
    id: hipaId,
    status: "processing",
    estimatedSeconds: 5,
  });

  setTimeout(async () => {
    await Hipa.findByIdAndUpdate(hipaId, {
      status: "complete",
      coverageScore: 62,
      gaps: [{ title: "No Critical Illness Cover" }],
      recommendations: [{ title: "Upgrade Plan" }],
      reportUrl: "https://mock-report.pdf",
    });
  }, 5000);
};

export const getHipa = async (req, res) => {
  const hipa = await Hipa.findById(req.params.id);

  if (!hipa) return res.status(404).json({ error: "Not found" });

  if (hipa.status === "processing") {
    return res.status(202).json({ retryAfter: 5 });
  }

  res.json({
    id: hipa._id,
    status: "complete",
    coverageScore: hipa.coverageScore,
    gaps: hipa.gaps,
    recommendations: hipa.recommendations,
    reportUrl: hipa.reportUrl,
  });
};
