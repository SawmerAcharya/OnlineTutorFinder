import {paymentModel} from "../models/paymentModel.js";
import moment from 'moment';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import axios from "axios";
import { balanceModel } from "../models/paymentModel.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = tokenDecode.id;

    // Extract transaction details from request body
    const { totalAmount, taxAmount, amount } = req.body;

    // Validate required fields
    if (totalAmount == null || taxAmount == null || amount == null) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create a new transaction
    const newTransaction = new paymentModel({
      userId,
      totalAmount,
      taxAmount,
      amount,
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({ 
      success: true, 
      message: "Transaction created successfully", 
      transactionUUID: newTransaction.transactionUUID, // Returning UUID
      transaction: newTransaction 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getBalance = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = tokenDecode.id;

    const balance = await balanceModel.findOne({
      userId:userId
    })

    if(balance){
      res.status(200).json({
        success:true,
        balance:balance.balance
      })
    }
    else{
      res.status(200).json({
        success:true,
        balance:0
      })
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export async function verifyEsewaPayment(encodedData) {
  try {
    // decoding base64 code revieved from esewa
    let decodedData = atob(encodedData);
    decodedData = await JSON.parse(decodedData);
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=EPAYTEST,signed_field_names=${decodedData.signed_field_names}`;

    const secretKey = "8gBm/:&EnhH.1/q";
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    console.log(hash);
    console.log(decodedData.signature);
    let reqOptions = {
      url: `https://rc-epay.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: "GET",
      headers: headersList,
    };
    if (hash !== decodedData.signature) {
      throw { message: "Invalid Info", decodedData };
    }
    let response = await axios.request(reqOptions);
    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw { message: "Invalid Info", decodedData };
    }
    return { response: response.data, decodedData };
  } catch (error) {
    throw error;
  }
}


