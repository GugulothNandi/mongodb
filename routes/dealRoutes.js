import express from "express";
import { createDeal, getDeals } from "../controllers/dealController.js";

const router = express.Router();

router.post("/", createDeal);
router.get("/", getDeals);

export default router;
