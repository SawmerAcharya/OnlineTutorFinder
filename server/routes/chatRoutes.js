import express from "express";
import { sendMessage, getChatHistory, getConversationPartners, getNotifications, markNotificationsRead } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/chat-history", getChatHistory);
router.get("/conversation", getConversationPartners);
router.get("/notifications", getNotifications);
router.post("/notifications/read", markNotificationsRead);

export default router;
