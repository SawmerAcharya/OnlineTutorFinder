import express from "express";
import { uploadAssignment, getAllAssignments } from "../controllers/assignmentController.js";

const router = express.Router();

// POST to upload new assignment
router.post("/upload", uploadAssignment);

// GET all assignments
router.get("/", getAllAssignments);


export default router;
