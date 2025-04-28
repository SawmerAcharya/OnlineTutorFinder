import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  dueDate: { type: String, required: true },
  dueTime: { type: String, required: true },
  publishDate: { type: String, required: true },
  publishTime: { type: String, required: true },
  assignmentFiles: [{ type: String }], // store uploaded file URLs or file names
  courseMaterials: [{ type: String }], // optional files
});

export default mongoose.model("Assignment", assignmentSchema);
