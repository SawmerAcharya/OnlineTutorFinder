import Assignment from "../models/Assignment.js";

// Upload Assignment
export const uploadAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      dueDate,
      dueTime,
      publishDate,
      publishTime,
      assignmentFiles,
      courseMaterials,
    } = req.body;

    const newAssignment = new Assignment({
      title,
      description,
      course,
      dueDate,
      dueTime,
      publishDate,
      publishTime,
      assignmentFiles,
      courseMaterials,
    });

    await newAssignment.save();
    res.status(201).json({ success: true, message: "Assignment uploaded successfully!" });
  } catch (error) {
    console.error("Assignment upload failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error("Fetching assignments failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
