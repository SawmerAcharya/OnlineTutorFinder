// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid"; // Import UUID for transactionUUID

// const paymentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Assuming you have a User model
//       required: true,
//     },
//     transactionUUID: {
//       type: String,
//       default: uuidv4, // Generates a unique UUID for each transaction
//       unique: true,
//     },
//     totalAmount: { 
//       type: Number, 
//       default: 0 
//     },
//     taxAmount: { 
//       type: Number, 
//       default: 0 
//     },
//     amount: { 
//       type: Number, 
//       default: 0 
//     },
//     status: {
//       type: String,
//       enum: ["pending", "completed", "failed", "refunded"], // Define possible statuses
//       default: "pending",
//     },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt automatically
// );


// const userBalanceSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Assuming you have a User model
//       required: true,
//     },
   
//     balance: { 
//       type: Number, 
//       default: 0 
//     },
    
//   },
//   { timestamps: true } // Adds createdAt and updatedAt automatically
// );
// export const paymentModel = mongoose.model("Payments", paymentSchema);
// export const balanceModel = mongoose.model("Balance", userBalanceSchema);

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID for transactionUUID

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    transactionUUID: {
      type: String,
      default: uuidv4, // Generates a unique UUID for each transaction
      unique: true,
    },
    totalAmount: { 
      type: Number, 
      default: 0 
    },
    taxAmount: { 
      type: Number, 
      default: 0 
    },
    amount: { 
      type: Number, 
      default: 0 
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"], // Define possible statuses
      default: "pending",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const userBalanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
   
    balance: { 
      type: Number, 
      default: 0 
    },
    
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const usersTransaction = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },

    receipientId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,

    },
   
    amount: { 
      type: Number, 
      default: 0 
    },

    allowWithdraw : { 
      type: Boolean, 
      default: false, 
    }
    
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export const paymentModel = mongoose.model("Payments", paymentSchema);
export const balanceModel = mongoose.model("Balance", userBalanceSchema);

export const usersTransactions = mongoose.model("Transactions", usersTransaction);