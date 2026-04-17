import express from "express";
import {
  createDeal,
  getDeals,
  getDealById,
} from "../controllers/dealController.js";

const router = express.Router();

router.post("/", createDeal);
router.get("/", getDeals);
router.get("/:id", getDealById);

export default router;
