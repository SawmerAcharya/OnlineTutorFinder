import express from 'express';
import {paymentModel,balanceModel} from "../models/paymentModel.js";
import moment from "moment";

import { createTransaction,verifyEsewaPayment,getBalance } from '../controllers/paymentController.js'; // Make sure the path is correct

const paymentRouter = express.Router();

// Route to create a transaction
paymentRouter.post('/createTransaction', createTransaction);

paymentRouter.get('/balance', getBalance);

paymentRouter.get("/complete-payment", async (req, res) => {
    const { data } = req.query; // Data received from eSewa's redirect
  
    try {
      // Verify payment with eSewa
      const paymentInfo = await verifyEsewaPayment(data);

     
  
      // Find the purchased item using the transaction UUID
      const purchasedItemData = await paymentModel.findOne(
        {
          transactionUUID:paymentInfo.response.transaction_uuid
        }
        
      );
  
      if (!purchasedItemData) {
        return res.status(500).json({
          success: false,
          message: "Purchase not found",
        });
      }
  
      
  
      // Update the status to 'completed'
      const updatedTransaction = await paymentModel.findOneAndUpdate(
        { transactionUUID: paymentInfo.response.transaction_uuid },  // Search condition
        { status: 'completed', updatedAt: moment().toISOString() },  // Fields to update
        { new: true }  // Return the updated document
      );

      await balanceModel.findOneAndUpdate(
        { userId: updatedTransaction.userId },  // Query to find the balance document
        { 
          $inc: { balance: paymentInfo.response.total_amount }  // Increment the balance by the amount
        },  
        { 
          new: true,  // Return the updated document
          upsert: true  // If no document is found, create a new one
        }
      );


  
      if (!updatedTransaction) {
        return res.status(500).json({
          success: false,
          message: "Failed to update transaction status",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Transaction status updated to 'completed'",
        transaction: updatedTransaction,  // Optionally, return the updated transaction
      });
  
     
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred during payment verification",
        error: error.message,
      });
    }
  });

export default paymentRouter;