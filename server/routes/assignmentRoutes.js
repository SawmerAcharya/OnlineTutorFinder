import express from "express";
import {
  createAssignment,
  getAssignmentsByTutor,
  getAssignmentById,
  deleteAssignment,
  updateAssignmentStatus,
  updateAssignment,
  getSubmissionsByTutor,
} from "../controllers/assignmentController.js";
import userAuth from "../middleware/userAuth.js";

const assignmentRouter = express.Router();

// Create assignment
assignmentRouter.post("/createAssignment", userAuth, createAssignment);

// Get all assignments by current tutor
assignmentRouter.get("/tutorAllAssignment", userAuth, getAssignmentsByTutor);

// Get single assignment
assignmentRouter.get("/:id", userAuth, getAssignmentById);

// Delete assignment
assignmentRouter.delete("/delete/:id", userAuth, deleteAssignment);

// Update assignment status (optional)
assignmentRouter.patch("/update-status/:id", userAuth, updateAssignmentStatus);

assignmentRouter.put("/update/:id", userAuth, updateAssignment);

assignmentRouter.get("/submissions/tutor", userAuth, getSubmissionsByTutor);

export default assignmentRouter;