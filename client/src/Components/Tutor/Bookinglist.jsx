
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SlideBars from "./SlideBars";
import Nav from "./Nav";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { userData, backendUrl } = useContext(AppContent);
  const tutorId = userData?._id; // dynamically extract tutorId when ready

  useEffect(() => {
    const fetchBookings = async () => {
      if (!tutorId) {
        console.log(" tutorId not available yet.");
        return;
      }

      console.log("Fetching bookings for tutorId:", tutorId);
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/bookings/tutor/getBooking/${tutorId}`
        );

        if (data.success) {
          setBookings(data.data);
          console.log("Bookings fetched:", data.data);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("🚨 Error fetching bookings:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [tutorId, backendUrl]); // <-- Will re-run when userData becomes available

  // const filteredBookings = bookings.filter((booking) =>
  //   booking.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userId &&
      booking.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) // Check if userId exists
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SlideBars />
      <div className="flex flex-col flex-grow">
        <Nav setSearchTerm={setSearchTerm} />

        <div className="p-5">
          <div className="bg-white shadow rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-4">Booking List</h3>

            {loading ? (
              <p className="text-center text-gray-500">Loading bookings...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="py-3 px-6">Full Name</th>
                      <th className="py-3 px-6">Mode</th>
                      <th className="py-3 px-6">Start Date</th>
                      <th className="py-3 px-6">End Date</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking._id} className="bg-white border-b">
                          <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                            <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
                              {booking.userId.profile ? (
                                <img
                                  src={`https://utfs.io/f/${booking.userId.profile}`}
                                  alt="Profile"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                booking.userId.name?.charAt(0)
                              )}
                            </span>
                            <span className="ml-2">
                              {booking.userId ? booking.userId.name : "No User"}
                            </span>
                          </td>
                          <td className="py-4 px-6 capitalize">
                            {booking.mode}
                          </td>
                          <td className="py-4 px-6">
                            {formatDate(booking.startDate)}
                          </td>
                          <td className="py-4 px-6">
                            {formatDate(booking.endDate)}
                          </td>
                          {/* <td className="py-4 px-6">
                            <span className="text-sm font-medium text-gray-700">
                              {booking.status.replace(/-/g, " ")}
                            </span>
                          </td> */}
                          <td className="py-4 px-6">
                            <span
                              className={`text-sm font-semibold px-3 py-1 rounded-full
      ${
        booking.status === "payment-received-awaiting-tutor-confirmation"
          ? "bg-yellow-50 text-yellow-800 border border-yellow-300"
          : booking.status === "payment-received-and-tutor-confirmed"
          ? "bg-green-50 text-green-800 border border-green-300"
          : booking.status ===
            "booking-completed-and-awaiting-student-confirmation"
          ? "bg-blue-50 text-blue-800 border border-blue-300"
          : booking.status === "refunded-and-cancelled"
          ? "bg-red-50 text-red-800 border border-red-300"
          : "bg-gray-50 text-gray-800 border border-gray-300"
      }`}
                            >
                              {booking.status.replace(/-/g, " ")}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-center">
                            <Link
                              to={`/Bookingsdetails/${booking._id}`}
                              className="text-blue-600 hover:underline flex justify-center items-center"
                            >
                              <IoEyeOutline className="mr-1 text-blue-500" />
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="py-4 px-6 text-center text-gray-500"
                        >
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingList;