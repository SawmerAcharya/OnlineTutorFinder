// import Booking from "../models/Booking.js";
// import moment from 'moment';

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const { userId, tutorId, date, timeSlot } = req.body;

//     const formattedDate = moment(date, 'MM/DD/YYYY').toISOString();

//     const newBooking = new Booking({
//       userId,
//       tutorId,
//       date: formattedDate,
//       timeSlot,
//       status: "pending",
//     });

//     const savedBooking = await newBooking.save();
//     res.status(201).json({ success: true, data: savedBooking });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get all bookings (for a specific user or tutor)
// export const getBookings = async (req, res) => {
//   try {
//     const { userId, tutorId } = req.query;

//     const filter = {};
//     if (userId) filter.userId = userId;
//     if (tutorId) filter.tutorId = tutorId;

//     const bookings = await Booking.find(filter).populate("userId tutorId");
//     res.status(200).json({ success: true, data: bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update a booking status (confirm or cancel)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!["confirmed", "canceled"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
//     if (!updatedBooking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     res.status(200).json({ success: true, data: updatedBooking });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



import Booking from "../models/Booking.js";
import userModel from "../models/userModel.js"
import moment from 'moment';
import { balanceModel,usersTransactions } from "../models/paymentModel.js";

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