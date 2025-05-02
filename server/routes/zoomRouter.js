import express from "express";
import { createZoomMeeting } from "../controllers/zoomController.js";

const zoomRouter = express.Router();

zoomRouter.post("/create-meeting", createZoomMeeting);

export default zoomRouter; 