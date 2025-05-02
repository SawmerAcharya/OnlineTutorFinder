import React, { useState, useEffect, useContext } from "react";
import ProfileSidebar from "./ProflieSlider";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userData, backendUrl } = useContext(AppContent);
  const userId = userData?._id; // student user id

  useEffect(() => {
    const fetchStudentBookings = async () => {
      if (!userId) {
        console.log("User ID not available yet.");
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/bookings/student/getBooking/${userId}`,
          { withCredentials: true }
        );
        if (data.success) {
          setBookings(data.data);
        } else {
          setError(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err.response || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentBookings();
  }, [userId, backendUrl]);

  // const filteredBookings = bookings.filter(
  //   (booking) =>
  //     booking.tutorId &&
  //     booking.tutorId.name &&
  //     booking.tutorId.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredBookings = bookings
    .filter((booking) => booking.status !== "awaiting-payment")
    .filter((booking) =>
      booking.tutorId?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const statusStyles = {
    "payment-received-awaiting-tutor-confirmation":
      "bg-amber-50 text-amber-700 border border-amber-200",
    "payment-received-and-tutor-confirmed":
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "booking-completed-and-awaiting-student-confirmation":
      "bg-blue-50 text-blue-700 border border-blue-200",
    "booking-completed-and-student-confirmed":
      "bg-green-50 text-green-700 border border-green-200",
    "booking-completion-rejected-by-student":
      "bg-rose-50 text-rose-700 border border-rose-200",
    "refunded-and-cancelled": "bg-red-50 text-red-700 border border-red-200",
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString();
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile sidebar on the left */}
          <ProfileSidebar />

          {/* Main content: Booking History */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-4">Booking History</h1>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search by tutor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-1/2"
              />

              {loading ? (
                <p className="text-center text-gray-500">Loading bookings...</p>
              ) : error ? (
                <p className="text-center text-red-600">Error: {error}</p>
              ) : bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="py-3 px-6">Tutor Name</th>
                        <th className="py-3 px-6">Mode</th>
                        {/* <th className="py-3 px-6">Start Date</th>
                        <th className="py-3 px-6">End Date</th> */}
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                          <tr key={booking._id} className="bg-white border-b">
                            <td className="py-4 px-6 font-medium text-gray-900">
                              {booking.tutorId.name}
                            </td>
                            <td className="py-4 px-6 capitalize">
                              {booking.mode}
                            </td>
                            {/* <td className="py-4 px-6">
                              {formatDate(booking.startDate)}
                            </td>
                            <td className="py-4 px-6">
                              {formatDate(booking.endDate)}
                            </td> */}
                            <td className="py-4 px-6">
                              <span
                                className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                                  statusStyles[booking.status] ||
                                  "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {booking.status.replace(/-/g, " ")}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Link
                                to={`/details/${booking._id}`}
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
              ) : (
                <p className="text-center text-gray-500">
                  No bookings available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}