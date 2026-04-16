import express from "express";
import { analyseHipa, getHipa } from "../controllers/hipaController.js";

const router = express.Router();

router.post("/analyse", analyseHipa);
router.get("/:id", getHipa);

export default router;
