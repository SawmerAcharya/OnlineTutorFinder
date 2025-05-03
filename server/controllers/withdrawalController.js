


import { WithdrawalModel } from "../models/RequestWithdrawls.js";
import { balanceModel } from "../models/paymentModel.js";
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";

// POST /withdrawals/request
export const requestWithdrawal = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const tutorId = tokenDecode.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid withdrawal amount." });
    }

    // Fetch tutor balance
    const balanceDoc = await balanceModel.findOne({ userId: tutorId });
    console.log("Tutor ID:", tutorId);
    console.log("Requested amount:", amount);
    console.log("Tutor balance document:", balanceDoc);
    if (!balanceDoc || balanceDoc.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance." });
    }

    // Fetch tutor user data
    const tutor = await userModel.findById(tutorId);
    if (
      !tutor.paymentInfo ||
      !tutor.paymentInfo.accountHolderName ||
      !tutor.paymentInfo.bankName ||
      !tutor.paymentInfo.accountNumber
    ) {
      return res.status(400).json({ success: false, message: "Please complete your bank account setup first." });
    }

    // Create Withdrawal Request (no balance deduction here)
    const newWithdrawal = await WithdrawalModel.create({
      tutorId,
      amount,
      paymentInfo: tutor.paymentInfo,
    });

    res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      withdrawal: newWithdrawal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
export const processWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;

    const withdrawal = await WithdrawalModel.findById(id);
    if (!withdrawal) {
      return res.status(404).json({ success: false, message: "Withdrawal not found." });
    }

    if (withdrawal.status !== "pending") {
      return res.status(400).json({ success: false, message: "Withdrawal already processed." });
    }

    // Fetch balance document
    const balanceDoc = await balanceModel.findOne({ userId: withdrawal.tutorId });
    if (!balanceDoc || balanceDoc.balance < withdrawal.amount) {
      withdrawal.status = "failed";
      await withdrawal.save();
      return res.status(400).json({ success: false, message: "Insufficient balance at time of processing. Withdrawal marked as failed." });
    }

    // Calculate fee and payout
    const adminFee = parseFloat((withdrawal.amount * 0.10).toFixed(2));
    const payoutAmount = withdrawal.amount - adminFee;

    // Deduct total from tutor's balance
    balanceDoc.balance -= withdrawal.amount;
    await balanceDoc.save();

    // Mark as completed
    withdrawal.status = "completed";
    withdrawal.adminFee = adminFee;           
    withdrawal.payoutAmount = payoutAmount;  
    await withdrawal.save();

    res.status(200).json({
      success: true,
      message: "Withdrawal completed successfully.",
      withdrawal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};



// GET /withdrawals/all - Admin: View all withdrawal requests
export const getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await WithdrawalModel.find()
      .populate("tutorId", "name email") // optional: get tutor info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      withdrawals,
    });
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


export const getWithdrawalHistory = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tutorId = decoded.id;

    // Fetch all withdrawals for this tutor, sorted by date descending
    const history = await WithdrawalModel.find({ tutorId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


export const getTotalEarnings = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tutorId = decoded.id;

    // Calculate total earnings = sum of all completed payouts
    const completedWithdrawals = await WithdrawalModel.find({
      tutorId,
      status: "completed",
    });

    const total = completedWithdrawals.reduce((sum, w) => sum + w.payoutAmount, 0);

    res.status(200).json({ success: true, totalEarnings: total });
  } catch (err) {
    console.error("Error fetching total earnings:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};