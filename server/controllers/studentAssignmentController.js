import Assignment from "../models/Assignment.js";
import submission from "../models/submission.js";

// Get all assignments assigned to the logged-in student
// export const getAssignedAssignments = async (req, res) => {
//   try {
//     const studentId = req.body.userId; // ✅ FIXED: use the injected userId from userAuth

//     const assignments = await Assignment.find({
//       assignedStudents: studentId,
//     }).populate("createdBy", "name email");

//     res.status(200).json({ success: true, assignments });
//   } catch (err) {
//     console.error("Assigned fetch error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const getAssignedAssignments = async (req, res) => {
  try {
    const studentId = req.body.userId;

    const assignments = await Assignment.find({
      assignedStudents: studentId,
    }).populate("createdBy", "name email");

    // Fetch all submitted assignmentIds by this student
    const submissions = await submission.find({ studentId }).select(
      "assignmentId"
    );
    const submittedIds = submissions.map((s) => s.assignmentId.toString());

    // Add `submitted: true/false` flag to each assignment
    const enrichedAssignments = assignments.map((assignment) => ({
      ...assignment.toObject(),
      submitted: submittedIds.includes(assignment._id.toString()),
    }));

    res.status(200).json({ success: true, assignments: enrichedAssignments });
  } catch (err) {
    console.error("Assigned fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Submit an assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, files, feedback } = req.body;
    const studentId = req.body.userId;

    // Prevent duplicate submissions
    const existing = await submission.findOne({ assignmentId, studentId });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already submitted" });
    }

    const submission = new submission({
      assignmentId,
      studentId,
      files,
      feedback,
    });

    await submission.save();
    res.status(201).json({ success: true, submission });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all submissions by current student
export const getMySubmissions = async (req, res) => {
  try {
    const studentId = req.body.userId;
    const submissions = await submission.find({ studentId })
      .populate("assignmentId", "title dueDate")
      .sort({ submittedAt: -1 });

    res.status(200).json({ success: true, submissions });
  } catch (err) {
    console.error("Submissions fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/assignments/:id
export const getStudentAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }
    res.json({ success: true, assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get the logged-in student's submission for a specific assignment
export const getSubmissionByAssignment = async (req, res) => {
  try {
    const studentId = req.body.userId;
    const { assignmentId } = req.params;

    const submission = await submission.findOne({
      assignmentId,
      studentId,
    }).populate("assignmentId", "title description dueDate");

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({ success: true, submission });
  } catch (err) {
    console.error("Fetch submission error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Grade a student's submission
export const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const { submissionId } = req.params;

    const updated = await submission.findByIdAndUpdate(
      submissionId,
      { grade, feedback },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({ success: true, submission: updated });
  } catch (err) {
    console.error("Grading error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
