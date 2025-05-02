// // controllers/submissionModelController.js
// import submissionModel from "../models/submissionModel.js";

// export const submitAssignment = async (req, res) => {
//   try {
//     const assignmentId = req.params.id;
//     const studentId = req.user?._id || req.body.studentId; // fallback for testing
//     const { fileUrl, fileName } = req.body;

//     if (!fileUrl || !fileName || !studentId) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const submissionModel = new submissionModel({
//       assignmentId,
//       studentId,
//       fileUrl,
//       fileName,
//     });

//     await submissionModel.save();
//     res.status(201).json({ success: true, message: "Assignment submitted successfully" });
//   } catch (error) {
//     console.error("Error in submitAssignment:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const getAssignmentsubmission = async (req, res) => {
//   try {
//     const assignmentId = req.params.id;

//     const submissionModels = await submissionModel.find({ assignmentId }).populate("studentId", "name email");

//     res.status(200).json({ success: true, submissionModels });
//   } catch (error) {
//     console.error("Error fetching submissionModels:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
import Submission from "../models/submissionModel.js";

export const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const studentId = req.user?._id || req.body.studentId;
    const { fileUrl, fileName } = req.body;

    if (!fileUrl || !fileName || !studentId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newSubmission = new Submission({
      assignmentId,
      studentId,
      fileUrl,
      fileName,
    });

    await newSubmission.save();
    res.status(201).json({ success: true, message: "Assignment submitted successfully" });
  } catch (error) {
    console.error("Error in submitAssignment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
