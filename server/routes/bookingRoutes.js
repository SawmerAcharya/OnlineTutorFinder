// import express from "express";
// import { createBooking, getBookings, updateBookingStatus } from "../controllers/bookingController.js";

// const router = express.Router();

// // Create a new booking
// router.post("/book", createBooking);

// // Get all bookings (for a specific user or tutor)
// router.get("/getbookings", getBookings);

// // Update a booking status (confirm or cancel)
// router.put("/booking/:id", updateBookingStatus);

// export default router;

import express from "express";
import { createBooking, getBookingsByTutor, getAllBookings, getBookingById, getBookingsByStudent, updateBookingStatus, getActiveBookingUsers, removeStudentFromTutorList } from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/book", createBooking);
router.get("/tutor/getBooking/:tutorId", getBookingsByTutor);
router.get("/getAllBookings", getAllBookings);
router.get("/activeBookingUsers/:tutorId", getActiveBookingUsers);
router.get("/:bookingId", getBookingById);
router.get("/student/getBooking/:userId", getBookingsByStudent);
router.put("/updateStatus/:bookingId", updateBookingStatus);
router.post('/tutor/RemoveStudent', removeStudentFromTutorList);



export default router;