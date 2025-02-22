import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  phoneNumber: { type: Number, required: true }, 
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  monthlyRate: { type: Number, required: true }, 
  city: { type: String, required: true },
  teachingMode: { type: String, required: true },
  subjects: [{ type: String, required: true }], 
  document: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const userRoleModel = mongoose.model('UserRoleModel', UserRoleSchema);

export default userRoleModel;
