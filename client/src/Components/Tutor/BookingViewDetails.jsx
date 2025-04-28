import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  User,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  Timer,
} from "lucide-react";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { toast } from "react-toastify";

function BookingViewDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/bookings/${bookingId}`,
          { withCredentials: true }
        );
        if (data.success) {
          setBooking(data.data);
        } else {
          setError(data.message || "Failed to load booking");
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId, backendUrl]);

  const handleStatusUpdate = async (newStatus) => {
    if (!bookingId || !booking) return;

    if (booking.status === newStatus) {
      toast.info(`Booking is already marked as "${newStatus.replace(/-/g, " ")}".`);
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to set the status to '${newStatus.replace(/-/g, " ")}'?`
    );
    if (!confirm) return;

    setUpdating(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/bookings/updateStatus/${bookingId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setBooking((prev) => ({ ...prev, status: newStatus }));
        toast.success(
          `Booking for ${booking.userId.name} marked as "${newStatus.replace(/-/g, " ")}".`
        );
        setTimeout(() => {
          navigate("/Bookinglist");
        }, 1500);
      } else {
        toast.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(
        "Error updating status: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <p className="p-4 text-center">Loading booking details...</p>;
  if (error)
    return <p className="p-4 text-center text-red-600">Error: {error}</p>;
  if (!booking) return <p className="p-4 text-center">No booking found.</p>;

  const { userId, startDate, endDate, startTime, dailyHour, message, status } =
    booking;

  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2563EB] p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Booking Details</h2>
          <button onClick={() => navigate(-1)}>
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Student Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-[#2563EB]" size={24} />
              <h3 className="text-lg font-semibold">Student Information</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-medium">{userId.name}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{userId.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-[#2563EB]" size={24} />
              <h3 className="text-lg font-semibold">Session Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Start Date</div>
                    <div className="font-medium">{formatDate(startDate)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">End Date</div>
                    <div className="font-medium">{formatDate(endDate)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Start Time</div>
                    <div className="font-medium">{startTime}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Timer size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Daily Hours</div>
                    <div className="font-medium">{dailyHour} hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-[#2563EB]" size={24} />
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              {message || "N/A"}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-[#2563EB]" size={24} />
              <h3 className="text-lg font-semibold">Current Status</h3>
            </div>
            <div className="inline-block bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm">
              {status.replace(/-/g, " ")}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Close
          </button>
          <button
            disabled={updating}
            onClick={() => handleStatusUpdate("refunded-and-cancelled")}
            className="px-6 py-2.5 bg-red-50 border border-red-100 text-red-600 rounded-lg hover:bg-red-100 font-medium flex items-center gap-2"
          >
            <X size={18} />
            Reject Booking
          </button>
          <button
            disabled={updating}
            onClick={() => handleStatusUpdate("payment-received-and-tutor-confirmed")}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
          >
            <Calendar size={18} />
            Accept Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingViewDetails;
