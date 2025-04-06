// controllers/chatController.js
import mongoose from "mongoose";
import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import Notification from "../models/notificationModel.js";


// Send a new chat message and create a notification for the receiver
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save the new chat message
    const newMessage = new chatModel({ sender: senderId, receiver: receiverId, message });
    await newMessage.save();

    // Fetch sender's name from the userModel
    const sender = await userModel.findById(senderId);
    const senderName = sender ? sender.name : "Unknown";

    // Create a notification for the receiver using sender's name
    const notification = new Notification({
      user: receiverId,
      message: `New message from ${senderName}`,
      chat: newMessage._id,
    });
    await notification.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Get chat history between two users
export const getChatHistory = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;
    if (!userId1 || !userId2) {
      return res.status(400).json({ success: false, message: "Both user IDs are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
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

// Get all conversation partners for a user
// export const getConversationPartners = async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "userId query param is required" });
//   }

//   try {
//     // Find all chat messages where userId is either sender or receiver
//     const chats = await chatModel.find({
//       $or: [{ sender: userId }, { receiver: userId }],
//     });

//     // Collect the *other* user IDs from each chat
//     const conversationPartnerIds = new Set();
//     for (const chat of chats) {
//       if (String(chat.sender) !== userId) {
//         conversationPartnerIds.add(String(chat.sender));
//       }
//       if (String(chat.receiver) !== userId) {
//         conversationPartnerIds.add(String(chat.receiver));
//       }
//     }

//     // Fetch the actual user objects for those partner IDs
//     const tutors = await userModel.find({ _id: { $in: [...conversationPartnerIds] } });
//     return res.status(200).json({ success: true, tutors });
//   } catch (error) {
//     console.error("Error in getConversationPartners:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// Get conversation partners based on existing chat messages
export const getConversationPartners = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId query param is required" });
  }

  try {
    // Fetch chats where userId is either sender or receiver
    const chats = await chatModel.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).select("sender receiver");

    // Collect unique partner IDs
    const partnerIds = new Set();
    chats.forEach(chat => {
      if (String(chat.sender) !== userId) partnerIds.add(chat.sender);
      if (String(chat.receiver) !== userId) partnerIds.add(chat.receiver);
    });

    // Fetch user details for partners
    const tutors = await userModel.find({ _id: { $in: [...partnerIds] } });
    return res.status(200).json({ success: true, tutors });
  } catch (error) {
    console.error("Error in getConversationPartners:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get notifications for a user
export const getNotifications = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId query param is required" });
  }
  try {
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const markNotificationsRead = async (req, res) => {
  try {
    const { notificationIds } = req.body;
    if (!notificationIds || notificationIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No notifications provided." });
    }
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { read: true } }
    );
    return res
      .status(200)
      .json({ success: true, message: "Notifications marked as read." });
  } catch (error) {
    console.error("Error marking notifications as read:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};