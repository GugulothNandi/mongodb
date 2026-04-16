import Deal from "../models/Deal.js";
import { v4 as uuidv4 } from "uuid";

export const createDeal = async (req, res) => {
  const dealId = "HS-" + Date.now();

  const deal = await Deal.create({
    dealId,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    hipaId: req.body.hipaId,
    productInterest: req.body.productInterest,
    amount: req.body.dealAmount,
    stage: req.body.pipelineStage,
    priority: req.body.priority,
    source: req.body.source,
    hubspotDealId: "mock_" + uuidv4(),
  });

  res.status(201).json({
    dealId,
    hubspotDealId: deal.hubspotDealId,
    pipeline: "Health Insurance",
    stage: deal.stage,
    hipaReportAttached: true,
    createdAt: deal.createdAt,
  });
};

export const getDeals = async (req, res) => {
  const deals = await Deal.find();

  res.json({
    deals: deals.map((d) => ({
      dealId: d.dealId,
      contactName: d.contactName,
      amount: d.amount,
      stage: d.stage,
      priority: d.priority,
    })),
    totalPipelineValue: deals.reduce((sum, d) => sum + d.amount, 0),
    nextCursor: null,
  });
};
