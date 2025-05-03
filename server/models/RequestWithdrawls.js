import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    adminFee: {
      type: Number,
      default: 0, // 10% of the amount
    },
    payoutAmount: {
      type: Number,
      default: 0, // 90% of the amount
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentInfo: {
      accountHolderName: { type: String, required: true },
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const WithdrawalModel = mongoose.model("Withdrawal", withdrawalSchema);