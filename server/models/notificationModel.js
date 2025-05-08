// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     message: { type: String, required: true },
//     chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
//     read: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const Notification = mongoose.model("Notification", notificationSchema);
// export default Notification;
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;