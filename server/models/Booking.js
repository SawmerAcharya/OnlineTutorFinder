// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     date: { type: Date, required: true },
//     timeSlot: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "canceled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);


import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    dailyHour : { type: Number, required: true },
    
    message: { type: String },

    // Added mode field with enum, required and default value
    mode: { type: String, enum: ["online", "offline"], required: true, default: "online" },

    status: {
      type: String,
      enum: ["awaiting-payment","payment-received-awaiting-tutor-confirmation", "payment-received-and-tutor-confirmed", "refunded-and-cancelled", "booking-completed-and-awaiting-student-confirmation","booking-completed-and-student-confirmed", "booking-completion-rejected-by-student"],
      default: "awaiting-payment",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);