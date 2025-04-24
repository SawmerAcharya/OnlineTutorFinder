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
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/book", createBooking);





export default router;