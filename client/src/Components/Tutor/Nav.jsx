

import React, { useEffect, useState, useContext, useRef } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import { AppContent } from "../../Context/AppContex";
import DropdownMenu from "../DropdownMenu";
import Notification from "./Notification";

function Nav() {
  const { backendUrl, userData } = useContext(AppContent);
  const [tutor, setTutor] = useState({ name: "Guest", subject: "N/A" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Fetch tutor data from userData
  useEffect(() => {
    if (userData?.tutorData) {
      setTutor({
        name: userData.name || "Guest",
        subject: userData.tutorData.CurrentSubject || "N/A",
      });
    }
  }, [userData]);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    const fetchNotifications = async () => {
      console.log("Current userData:", userData);
      if (!userData?._id) {
        console.log("User ID is missing. Skipping API call.");
        return;
      }
      const url = `${backendUrl}/api/chat/notifications?userId=${userData._id}`;
      console.log("Fetching notifications from:", url);

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Raw API response:", data);
        if (data.success) {
          console.log("Parsed notifications:", data.data);
          setNotifications(data.data);
        } else {
          console.warn("API returned success: false", data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userData, backendUrl]);

  // Handler for clearing (marking as read) all notifications
  const handleClearAll = async () => {
    if (notifications.length === 0) return;
    // Collect all notification IDs
    const notificationIds = notifications.map((notif) => notif._id);
    try {
      const response = await fetch(`${backendUrl}/api/chat/notifications/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationIds }),
      });
      const data = await response.json();
      if (data.success) {
        // Option: mark all notifications as read in the state
        setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
      } else {
        console.warn("Clear all failed", data);
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="bg-white shadow px-4 py-2 flex justify-between items-center">
      {/* Search Bar */}
      <div className="flex border-2 rounded overflow-hidden">
        <input
          className="px-4 py-2 w-80 outline-none"
          type="search"
          placeholder="Search users ..."
        />
        <button className="flex items-center justify-center px-4 border-l">
          <FiSearch />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        {/* Notification Bell */}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <FiBell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div ref={notifRef} className="absolute right-0 mt-2 w-96 z-50">
              <Notification
                notifications={notifications}
                onClearAll={handleClearAll}
              />
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative ml-8 mr-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="ml-2 text-left">
              <p className="text-sm font-semibold">{tutor.name}</p>
              <p className="text-xs text-gray-500">{tutor.subject} Tutor</p>
            </div>
            <div className="ml-4">
              <Avatar
                src={
                  userData?.profile
                    ? `https://utfs.io/f/${userData.profile}`
                    : "https://via.placeholder.com/120"
                }
                alt={tutor.name}
                className="w-10 h-10"
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 z-50">
              <DropdownMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

