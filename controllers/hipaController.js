import Hipa from "../models/Hipa.js";
import { v4 as uuidv4 } from "uuid";

export const analyseHipa = async (req, res) => {
  try {
    const hipaId = "hipa_" + uuidv4();

    const { customer_id, venture_id, input_type } = req.body;

    if (!venture_id || !input_type) {
      return res.status(400).json({
        error: "input_type and venture_id are required",
      });
    }

    await Hipa.create({
      _id: hipaId,
      customer_id,
      venture_id,
      input_type,
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
        coverage_score: 72,
        gaps: [
          {
            severity: "high",
            title: "No Critical Illness Cover",
            description: "CI cover missing",
            riskLabel: "HIGH RISK",
          },
        ],
        recommendations: [
          {
            title: "Upgrade Plan",
            description: "Increase coverage to 10L",
            premiumIncrement: 20000,
          },
        ],
        total_recommended_premium: 32000,
        report_url: "https://mock-report.pdf",
      });
    }, 5000);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/hipa/:id
 */
export const getHipa = async (req, res) => {
  try {
    const hipa = await Hipa.findById(req.params.id);

    if (!hipa) {
      return res.status(404).json({ error: "Not found" });
    }

    if (hipa.status === "processing") {
      return res.status(202).json({
        id: hipa._id,
        status: "processing",
        retryAfter: 5,
      });
    }

    return res.json({
      id: hipa._id,
      status: hipa.status,
      coverage_score: hipa.coverage_score,
      gaps: hipa.gaps,
      recommendations: hipa.recommendations,
      report_url: hipa.report_url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
