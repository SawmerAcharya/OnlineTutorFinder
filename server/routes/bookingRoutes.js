// import express from "express";
// import Booking from "../models/Booking.js"; 
// const bookingRoutes = express.Router();


// bookingRoutes.post("/create", async (req, res) => {
//   try {
//     const bookingData = req.body;
//     const newBooking = new Booking(bookingData);
//     await newBooking.save();
//     res.status(200).json({ message: "Booking successful", booking: newBooking });
//   } catch (err) {
//     res.status(500).json({ message: "Error booking session", error: err.message });
//   }
// });

// export default bookingRoutes;



import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userId, tutorId, sessionMode, date, time, subject, topicDetails, requirements, totalPrice } = req.body;

    // Check if user and tutor exist
    const user = await User.findById(userId);
    const tutor = await User.findById(tutorId);
    if (!user || !tutor) {
      return res.status(400).json({ error: "User or Tutor not found" });
    }

    const newBooking = new Booking({
      user: userId,
      tutor: tutorId,
      sessionMode,
      date,
      time,
      subject,
      topicDetails,
      requirements,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
