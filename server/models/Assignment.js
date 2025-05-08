import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: {
      type: Date,
      required: true,
    },

    files: [String], // optional, file URLs
    assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // the tutor
    status: {
      type: String,
      enum: ["active", "draft", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);