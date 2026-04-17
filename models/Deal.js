import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    deal_id: {
      type: String,
      required: true,
      unique: true, // keep this
    },

    deal_name: {
      type: String,
      required: true,
      trim: true,
    },

    customer_id: {
      type: String,
      required: false,
    },

    agent_id: {
      type: String,
      required: false,
    },

    venture_id: {
      type: String,
      required: false,
    },

    channel_id: {
      type: String,
      required: false,
    },

    hipa_id: {
      type: String,
      required: false,
    },

    pipeline: {
      type: String,
      default: "Health Insurance",
    },

    stage: {
      type: String,
      enum: [
        "consultation_scheduled",
        "needs_analysis",
        "proposal_sent",
        "closing",
        "won",
        "lost",
      ],
      required: true,
    },

    product_interest: {
      type: [String],
      default: [],
    },

    recommended_insurer: String,

    amount: {
      type: Number,
      required: true,
    },

    priority: {
      type: String,
      enum: ["hot", "warm", "cold"],
      default: "warm",
    },

    source: {
      type: String,
      default: "Field Visit",
    },

    status: {
      type: String,
      default: "KYC Pending",
    },

    next_action: String,

    days_in_stage: {
      type: Number,
      default: 0,
    },

    notes: String,

    timeline: [
      {
        event: String,
        at: {
          type: Date,
          default: Date.now,
        },
        actor: String,
      },
    ],

    lost_reason: String,

    won_at: Date,
  },
  {
    timestamps: true,
  },
);

dealSchema.index({ agent_id: 1, stage: 1 });
dealSchema.index({ customer_id: 1 });
dealSchema.index({ venture_id: 1, stage: 1 });

const Deal = mongoose.model("Deal", dealSchema);

export default Deal;
