import Deal from "../models/Deal.js";
import { v4 as uuidv4 } from "uuid";

// CREATE DEAL
export const createDeal = async (req, res) => {
  try {
    const {
      deal_name,
      customer_id,
      agent_id,
      venture_id,
      channel_id,
      stage,
      amount,
      priority,
      source,
      product_interest,
      hipa_id,
      notes,
    } = req.body;

    const deal = await Deal.create({
      deal_id: "HS-" + uuidv4().slice(0, 8),
      deal_name,
      customer_id,
      agent_id,
      venture_id,
      channel_id,
      stage,
      amount,
      priority,
      source,
      product_interest,
      hipa_id,
      notes,
      timeline: [
        {
          event: "Deal Created",
          actor: "RM",
        },
      ],
    });

    res.status(201).json({
      message: "Deal created successfully",
      deal,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL DEALS
export const getDeals = async (req, res) => {
  try {
    const { stage } = req.query;

    let filter = {};
    if (stage) filter.stage = stage;

    const deals = await Deal.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      deals,
      total: deals.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE DEAL
export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findOne({ deal_id: req.params.id });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
