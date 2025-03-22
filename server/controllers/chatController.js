import mongoose from "mongoose";
import chatModel from "../models/chatModel.js";

// Send a new chat message (for REST endpoint, if needed)
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newMessage = new chatModel({ sender: senderId, receiver: receiverId, message });
    await newMessage.save();
    return res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get chat history between two users
export const getChatHistory = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;
    if (!userId1 || !userId2) {
      return res.status(400).json({ success: false, message: "Both user IDs are required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(userId1) ||
      !mongoose.Types.ObjectId.isValid(userId2)
    ) {
      return res.status(400).json({ success: false, message: "Invalid user ID(s)" });
    }
    const chatHistory = await chatModel
      .find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      })
      .populate("sender", "name profilePic")
      .populate("receiver", "name profilePic")
      .sort({ createdAt: 1 })
      .limit(50);
    return res.status(200).json({ success: true, data: chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};