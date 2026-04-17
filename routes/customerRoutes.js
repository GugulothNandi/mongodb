import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
} from "../controllers/customerController.js";

const router = express.Router();

// CREATE
router.post("/", createCustomer);

// LIST
router.get("/", getCustomers);

// SINGLE
router.get("/:id", getCustomerById);

export default router;
