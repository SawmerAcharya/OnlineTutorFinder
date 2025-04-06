import Booking from "../models/Booking.js";
import moment from 'moment';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId, tutorId, date, timeSlot } = req.body;

    const formattedDate = moment(date, 'MM/DD/YYYY').toISOString();

    const newBooking = new Booking({
      userId,
      tutorId,
      date: formattedDate,
      timeSlot,
      status: "pending",
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all bookings (for a specific user or tutor)
export const getBookings = async (req, res) => {
  try {
    const { userId, tutorId } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (tutorId) filter.tutorId = tutorId;

    const bookings = await Booking.find(filter).populate("userId tutorId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a booking status (confirm or cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "canceled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
