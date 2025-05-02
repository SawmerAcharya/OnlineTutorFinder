import Booking from "../models/Booking.js";
import userModel from "../models/userModel.js"
import moment from 'moment';
import { balanceModel,usersTransactions } from "../models/paymentModel.js";
import Notification from "../models/notificationModel.js"
import transporter from "../config/nodemailer.js";
import { createRecurringZoomMeeting } from "../config/createZoomMeeting.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId, tutorId, startDate,endDate, time,dailyHour, message, mode } = req.body;

    //check if user has sufficient balance

    const tutorData = await userModel.findById(tutorId);
    
    const tutorRate =  parseFloat(tutorData.tutorData.HourlyRate);

    const calculateTotalDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      return timeDifference / (1000 * 3600 * 24); // Convert time difference to days
    };

    const totalDays = calculateTotalDays(startDate,endDate);
    const totalCost = totalDays * tutorRate * dailyHour;

   
    

    const userBalance = await balanceModel.findOne({
      userId:userId
    })
    
    

    if((userBalance.balance || 0) < totalCost){
      return res.status(401).json({ success: false, message: "Insufficient Balance" });
    }

    const newBooking = new Booking({
      userId:userId,
      tutorId :tutorId,
      // startDate: moment(startDate, 'MM/DD/YYYY').toISOString(),
      // endDate: moment(endDate, 'MM/DD/YYYY').toISOString(),
      startDate: moment(startDate).toISOString(), // UPDATED: Now auto-detects format and converts to ISO string
      endDate: moment(endDate).toISOString(),   
      startTime : time,
      dailyHour: dailyHour,
      mode: mode,         // UPDATED: Now uses the mode from req.body
      message: message,
      status : "payment-received-awaiting-tutor-confirmation"
    });

    const newTransaction= new usersTransactions({
      senderId : userId,
      receipientId:tutorId,
      amount : totalCost,
      message: message, // additional message from user
      mode: mode, 
    })

    const savedBooking = await newBooking.save();
    const savedTransaction = await newTransaction.save();

    userBalance.balance -= totalCost;
    await userBalance.save();


    return res.status(201).json({ success: true, data: {
      "booking":savedBooking,
      "transaction":savedTransaction,

    } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name profile")
      .populate("tutorId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBookingsByTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const bookings = await Booking.find({ tutorId })
      .populate("userId", "name profile")
      .populate("tutorId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate("userId", "name email profile")
      .populate("tutorId", "name email tutorData")
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get bookings by student (userId)
export const getBookingsByStudent = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate("userId", "name email profile")
      .populate("tutorId", "name tutorData")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Update booking status
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;

//     const allowedStatuses = [
//       "awaiting-payment",
//       "payment-received-awaiting-tutor-confirmation",
//       "payment-received-and-tutor-confirmed",
//       "refunded-and-cancelled"
//     ];

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status value" });
//     }

//     const updatedBooking = await BookingV2.findByIdAndUpdate(
//       bookingId,
//       { status },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     return res.status(200).json({ success: true, data: updatedBooking });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "awaiting-payment",
      "payment-received-awaiting-tutor-confirmation",
      "payment-received-and-tutor-confirmed",
      "refunded-and-cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
      .populate("userId", "name email") // student
      .populate("tutorId", "name email"); // tutor

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (status === "payment-received-and-tutor-confirmed") {
      const startDate = new Date(updatedBooking.startDate);
      const endDate = new Date(updatedBooking.endDate);
      const dailyHour = updatedBooking.dailyHour || 1;

      // Calculate number of days (inclusive)
      const msPerDay = 1000 * 60 * 60 * 24;
      const numberOfDays = Math.ceil((endDate - startDate) / msPerDay) + 1;

      const duration = dailyHour * 60; // minutes for Zoom
      const topic = "Tutoring Session";
      const startTime = startDate.toISOString();

      try {
        const zoomResult = await createRecurringZoomMeeting(
          topic,
          startTime,
          duration,
          numberOfDays
        );

        const student = await userModel.findById(updatedBooking.userId);
        const tutor = await userModel.findById(updatedBooking.tutorId);

        const emailSubject = "Your Zoom Tutoring Session is Scheduled!";
        const emailText = `
Topic: ${topic}
Start Date: ${startDate.toDateString()}
Duration (daily): ${dailyHour} hour(s)
Total Days: ${numberOfDays}
Zoom Join Link: ${zoomResult.joinUrl}

Thank you!
`;

        // Send email to student
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: student.email,
          subject: emailSubject,
          text: `Hi ${student.name},\n\n${emailText}`,
        });

        // Send email to tutor
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: tutor.email,
          subject: emailSubject,
          text: `Hello ${tutor.name},\n\n${emailText}\nStart URL (host): ${zoomResult.startUrl}`,
        });

        console.log("Zoom meeting created and emails sent!");
      } catch (err) {
        console.error("Error creating Zoom meeting:", err.message);
      }
    }

    const notificationMessage = `Your booking with ${
      updatedBooking.tutorId.name
    } is now "${status.replace(/-/g, " ")}".`;

    const notification = new Notification({
      user: updatedBooking.userId._id,
      sender: updatedBooking.tutorId._id,
      message: notificationMessage,
    });

    await notification.save();

    return res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get users with active booking statuses
export const getActiveBookingUsers = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const activeStatuses = [
      "payment-received-awaiting-tutor-confirmation",
      "payment-received-and-tutor-confirmed"
    ];

    const userIds = await Booking.distinct("userId", {
      status: { $in: activeStatuses },
      tutorId: tutorId
    });

    const users = await userModel.find({ _id: { $in: userIds } }).select("name email profile");

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const removeStudentFromTutorList = async (req, res) => {
  try {
    const { tutorId, studentId } = req.body;

    const tutor = await userModel.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }

    if (!tutor.removedStudents) {
      tutor.removedStudents = [];
    }

    if (!tutor.removedStudents.includes(studentId)) {
      tutor.removedStudents.push(studentId);
      await tutor.save();
    }

    return res.status(200).json({ success: true, message: "Student removed from tutor's list" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const closeBookingByTutor = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.status !== "payment-received-and-tutor-confirmed") {
      return res.status(400).json({ success: false, message: "Cannot complete this booking at its current status" });
    }

    booking.status = "booking-completed-and-awaiting-student-confirmation";
    await booking.save();

    return res.status(200).json({ success: true, message: "Tutor marked booking as completed", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const closeBookingByStudent = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { action } = req.body; // "confirm" or "reject"

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.status !== "booking-completed-and-awaiting-student-confirmation") {
      return res.status(400).json({ success: false, message: "Tutor must mark the booking as completed first" });
    }

    if (action === "reject") {
      booking.status = "booking-completion-rejected-by-student";
      await booking.save();
      return res.status(200).json({ success: true, message: "Student rejected booking completion", booking });
    }

    // If student confirms
    if (action === "confirm") {
      booking.status = "booking-completed-and-student-confirmed";
      await booking.save();

      const transaction = await usersTransactions.findOne({ bookingId: booking._id });
      if (!transaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }

      // Update tutor's balance
      const tutorBalance = await balanceModel.findOne({ userId: booking.tutorId });
      if (tutorBalance) {
        tutorBalance.balance += transaction.amount;
        await tutorBalance.save();
      } else {
        await balanceModel.create({
          userId: booking.tutorId,
          balance: transaction.amount
        });
      }

      return res.status(200).json({ success: true, message: "Student confirmed booking completion", booking });
    }

    return res.status(400).json({ success: false, message: "Invalid action. Must be 'confirm' or 'reject'." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
