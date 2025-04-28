


// import Booking from "../models/Booking.js";
// import userModel from "../models/userModel.js"
// import moment from 'moment';
// import { balanceModel,usersTransactions } from "../models/paymentModel.js";

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const { userId, tutorId, startDate,endDate, time,dailyHour, message, mode } = req.body;

//     //check if user has sufficient balance

//     const tutorData = await userModel.findById(tutorId);
    
//     const tutorRate =  parseFloat(tutorData.tutorData.HourlyRate);

//     const calculateTotalDays = (startDate, endDate) => {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const timeDifference = end - start;
//       return timeDifference / (1000 * 3600 * 24); // Convert time difference to days
//     };

//     const totalDays = calculateTotalDays(startDate,endDate);
//     const totalCost = totalDays * tutorRate * dailyHour;

   
    

//     const userBalance = await balanceModel.findOne({
//       userId:userId
//     })
    
    

//     if((userBalance.balance || 0) < totalCost){
//       return res.status(401).json({ success: false, message: "Insufficient Balance" });
//     }

//     const newBooking = new Booking({
//       userId:userId,
//       tutorId :tutorId,
//       // startDate: moment(startDate, 'MM/DD/YYYY').toISOString(),
//       // endDate: moment(endDate, 'MM/DD/YYYY').toISOString(),
//       startDate: moment(startDate).toISOString(), // UPDATED: Now auto-detects format and converts to ISO string
//       endDate: moment(endDate).toISOString(),   
//       startTime : time,
//       dailyHour: dailyHour,
//       mode: mode,         // UPDATED: Now uses the mode from req.body
//       message: message,
//       status : "payment-received-awaiting-tutor-confirmation"
//     });

//     const newTransaction= new usersTransactions({
//       senderId : userId,
//       receipientId:tutorId,
//       amount : totalCost,
//       message: message, // additional message from user
//       mode: mode, 
//     })

//     const getActiveBookingUsers = async (req, res) => {
//       try {
//         const { tutorId } = req.params;
    
//         const activeStatuses = [
//           "payment-received-awaiting-tutor-confirmation",
//           "payment-received-and-tutor-confirmed"
//         ];
    
//         const userIds = await BookingV2.distinct("userId", {
//           status: { $in: activeStatuses },
//           tutorId: tutorId
//         });
    
//         const users = await userModel.find({ _id: { $in: userIds } }).select("name email profile");
    
//         return res.status(200).json({ success: true, data: users });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Server Error" });
//       }
//     };
    
    
    
//     const removeStudentFromTutorList = async (req, res) => {
//       try {
//         const { tutorId, studentId } = req.body;
    
//         const tutor = await userModel.findById(tutorId);
//         if (!tutor) {
//           return res.status(404).json({ success: false, message: "Tutor not found" });
//         }
    
//         if (!tutor.removedStudents) {
//           tutor.removedStudents = [];
//         }
    
//         if (!tutor.removedStudents.includes(studentId)) {
//           tutor.removedStudents.push(studentId);
//           await tutor.save();
//         }
    
//         return res.status(200).json({ success: true, message: "Student removed from tutor's list" });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Server Error" });
//       }
//     };
    
    
    

//     const savedBooking = await newBooking.save();
//     const savedTransaction = await newTransaction.save();

//     userBalance.balance -= totalCost;
//     await userBalance.save();


//     return res.status(201).json({ success: true, data: {
//       "booking":savedBooking,
//       "transaction":savedTransaction,

//     } });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


import Booking from "../models/Booking.js";
import userModel from "../models/userModel.js"
import moment from 'moment';
import { balanceModel,usersTransactions } from "../models/paymentModel.js";
import Notification from "../models/notificationModel.js"

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
      "refunded-and-cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("userId", "name") // student
     .populate("tutorId", "name"); // tutor

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Create notification for student
    const notificationMessage = `Your booking with ${updatedBooking.tutorId.name} is now "${status.replace(/-/g, ' ')}".`;

    const notification = new Notification({
      user: updatedBooking.userId._id,       // recipient: student
      sender: updatedBooking.tutorId._id,    // sender: tutor
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


