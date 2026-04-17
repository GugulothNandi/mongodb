import Customer from "../models/Customer.js";
import { logAudit } from "../utils/logAudit.js";
/**
 * CREATE CUSTOMER
 * POST /api/customers
 */
export const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, dob, gender, address, source } = req.body;

    // basic validation
    if (!name || !phone) {
      return res.status(400).json({
        error: "name and phone are required",
      });
    }

    const existing = await Customer.findOne({ phone });

    if (existing) {
      return res.status(409).json({
        error: "Customer already exists with this phone",
      });
    }

    const customer = await Customer.create({
      name,
      phone,
      email,
      dob,
      gender,
      address,
      source,
      lifecycle_stage: "awareness",
    });
    await logAudit({
      actor_type: "agent",
      actor_id: "mock_agent_1",
      action: "create",
      collection: "customers",
      document_id: customer._id,
      changes: req.body,
    });

    return res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * GET ALL CUSTOMERS
 * GET /api/customers
 */
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * GET SINGLE CUSTOMER
 * GET /api/customers/:id
 */
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
