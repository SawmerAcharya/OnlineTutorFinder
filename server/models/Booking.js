import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  sessionMode: String,
  duration: Number,
  date: String,
  time: String,
  subject: String,
  topicDetails: String,
  requirements: String,
  totalPrice: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking; // ✅ ES6 export

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user who books the session
//   tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The tutor being booked
//   sessionMode: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
//   subject: { type: String, required: true },
//   topicDetails: { type: String, required: true },
//   requirements: { type: String, required: true },
//   totalPrice: { type: Number, required: true },
// }, { timestamps: true });

// const Booking = mongoose.model("Booking", bookingSchema);

// export default Booking;
