// import mongoose from "mongoose";

// const submissionSchema = new mongoose.Schema(
//   {
//     assignmentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Assignment", // Reference to the Assignment model
//       required: true,
//     },
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Reference to the User model
//       required: true,
//     },
//     fileUrl: {
//       type: String,
//       required: true,
//     },
//     fileName: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true } // Automatically adds createdAt and updatedAt
// );

// // Prevent model overwrite error in development
// const submissionModel = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);

// export default submissionModel;



import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    files: [{ type: String }],
    feedback: { type: String },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("submission", submissionSchema);