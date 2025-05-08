import express from "express";
import {
  createBooking,
  getBookingsByTutor,
  getAllBookings,
  getBookingById,
  getBookingsByStudent,
  updateBookingStatus,
  getActiveBookingUsers,
  removeStudentFromTutorList,
  closeBookingByStudent,
  closeBookingByTutor,
  getStudentbyTutor,
} from "../controllers/bookingControllerV2.js";

const router = express.Router();

// Create a new booking
router.post("/book", createBooking);
router.get("/tutor/getBooking/:tutorId", getBookingsByTutor);
router.get("/getAllBookings", getAllBookings);
router.get("/activeBookingUsers/:tutorId", getActiveBookingUsers);
router.get("/:bookingId", getBookingById);
router.get("/student/getBooking/:userId", getBookingsByStudent);
router.put("/updateStatus/:bookingId", updateBookingStatus);
router.post("/tutor/RemoveStudent", removeStudentFromTutorList);
router.put("/tutorClose/:bookingId", closeBookingByTutor);
router.put("/studentClose/:bookingId", closeBookingByStudent);
// In your routes file
router.get("/students/:tutorId", getStudentbyTutor);

export default router;