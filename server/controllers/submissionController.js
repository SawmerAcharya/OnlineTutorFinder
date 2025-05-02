
// import Submission from "../models/submissionModel.js";

// export const submitAssignment = async (req, res) => {
//   try {
//     const assignmentId = req.params.id;
//     const studentId = req.user?._id || req.body.studentId;
//     const { fileUrl, fileName } = req.body;

//     if (!fileUrl || !fileName || !studentId) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newSubmission = new Submission({
//       assignmentId,
//       studentId,
//       fileUrl,
//       fileName,
//     });

//     await newSubmission.save();
//     res.status(201).json({ success: true, message: "Assignment submitted successfully" });
//   } catch (error) {
//     console.error("Error in submitAssignment:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
