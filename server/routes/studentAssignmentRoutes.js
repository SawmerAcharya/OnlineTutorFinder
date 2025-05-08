// import express from "express";
// import {
//   getAssignedAssignments,
//   submitAssignment,
//   getMySubmissions,
//   getStudentAssignmentById,
// } from "../controllers/studentAssignmentController.js";
// import userAuth from "../middleware/userAuth.js";
// import {
//   getSubmissionByAssignment,
//   gradeSubmission,
// } from "../controllers/studentAssignmentController.js";

// const StudentAssignmentRouter = express.Router();

// // Get assignments assigned to student
// StudentAssignmentRouter.get("/assigned", userAuth, getAssignedAssignments);

// // Submit an assignment
// StudentAssignmentRouter.post("/submit", userAuth, submitAssignment);

// // Get all submissions by this student
// StudentAssignmentRouter.get("/my-submissions", userAuth, getMySubmissions);

// StudentAssignmentRouter.get("/:id", userAuth, getStudentAssignmentById);
// StudentAssignmentRouter.get(
//   "/submission/:assignmentId",
//   userAuth,
//   getSubmissionByAssignment
// );

// StudentAssignmentRouter.patch(
//   "/grade/:submissionId",
//   userAuth,
//   gradeSubmission
// );

// export default StudentAssignmentRouter;
import express from "express";
import {
  getAssignedAssignments,
  submitAssignment,
  getMySubmissions,
  getStudentAssignmentById,
} from "../controllers/studentAssignmentController.js";
import userAuth from "../middleware/userAuth.js";
import {
  getSubmissionByAssignment,
  gradeSubmission,
} from "../controllers/studentAssignmentController.js";

const StudentAssignmentRouter = express.Router();

// Get assignments assigned to student
StudentAssignmentRouter.get("/assigned", userAuth, getAssignedAssignments);

// Submit an assignment
StudentAssignmentRouter.post("/submit", userAuth, submitAssignment);

// Get all submissions by this student
StudentAssignmentRouter.get("/my-submissions", userAuth, getMySubmissions);

StudentAssignmentRouter.get("/:id", userAuth, getStudentAssignmentById);
StudentAssignmentRouter.get(
  "/submission/:assignmentId",
  userAuth,
  getSubmissionByAssignment
);

StudentAssignmentRouter.patch(
  "/grade/:submissionId",
  userAuth,
  gradeSubmission
);

export default StudentAssignmentRouter;