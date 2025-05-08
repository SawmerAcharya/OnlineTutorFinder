import Assignment from "../models/Assignment.js";
import userModel from "../models/userModel.js";
import submission from "../models/submission.js";

// Create
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, files, assignedStudents } = req.body;

    // Fetch full user info using userId from req.body
    const user = await userModel.findById(req.body.userId);

    if (!user || user.role !== "tutor") {
      return res.status(403).json({
        success: false,
        message: "Only tutors can create assignments",
      });
    }

    const assignment = new Assignment({
      title,
      description,
      dueDate: new Date(dueDate),
      files,
      assignedStudents,
      createdBy: user._id, // Use fetched user's ID
    });

    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Assignments for Tutor
export const getAssignmentsByTutor = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      createdBy: req.body.userId,
    }).populate("assignedStudents", "name email");

    res.status(200).json({ success: true, assignments });
  } catch (error) {
    console.error("Fetch assignments error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get one
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "assignedStudents",
      "name email"
    );
    if (!assignment)
      return res.status(404).json({ success: false, message: "Not found" });

    const isoString = assignment.dueDate?.toISOString() || "";
    const [date, time] = isoString.split("T");

    res.status(200).json({
      success: true,
      assignment: {
        ...assignment.toObject(),
        dueDate: date,
        dueTime: time?.substring(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Optional: Update status
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update existing assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { title, description, dueDate, files, assignedStudents, status } =
      req.body;

    const updated = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(files && { files }),
        ...(assignedStudents && { assignedStudents }),
        ...(status && { status }),
      },
      { new: true }
    ).populate("assignedStudents", "name email");

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    res.status(200).json({ success: true, assignment: updated });
  } catch (error) {
    console.error("Update assignment error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSubmissionsByTutor = async (req, res) => {
  try {
    const tutorId = req.body?.userId;

    if (!tutorId) {
      return res.status(401).json({
        success: false,
        message: "Tutor ID missing or not authorized",
      });
    }

    const assignments = await Assignment.find({ createdBy: tutorId }).select(
      "_id"
    );

    const assignmentIds = assignments.map((a) => a._id);

    const submissions = await  submission.find({
      assignmentId: { $in: assignmentIds },
    })
      .populate("assignmentId", "title dueDate assignedStudents")
      .populate("studentId", "name email profile");

    res.status(200).json({ success: true, submissions });
  } catch (err) {
    console.error("Error in getSubmissionsByTutor:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};