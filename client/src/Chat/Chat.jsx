import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatSidebar } from "./ChatSlider.jsx";
import { ChatWindow } from "./ChatWindows";
import { AppContent } from "../Context/AppContex.jsx";
import axios from "axios";
import io from "socket.io-client";

function Chat() {
  const { userData, backendUrl } = useContext(AppContent);
  const [tutors, setTutors] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  // Fetch tutors via REST
  const fetchTutors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/tutors`);
      setTutors(data.tutors || []);
      console.log("Tutors fetched:", data.tutors);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  // Fetch chat history for a conversation between student and tutor via Axios
  const fetchMessages = async (studentId, tutorId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/chat-history?userId1=${studentId}&userId2=${tutorId}`
      );
      setMessages((prev) => ({
        ...prev,
        [tutorId]: Array.isArray(data.data) ? data.data : [],
      }));
      console.log(
        `Messages fetched for student ${studentId} and tutor ${tutorId}:`,
        data.data
      );
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Initialize Socket.IO on mount for real-time updates
  useEffect(() => {
    if (userData) {
      socketRef.current = io(backendUrl, {
        auth: { token: localStorage.getItem("token") },
        transports: ["websocket"],
      });

      // Listen for incoming messages
      socketRef.current.on("receiveMessage", (newMessage) => {
        setMessages((prev) => {
          const tutorMsgs = prev[selectedTutorId] || [];
          return { ...prev, [selectedTutorId]: [...tutorMsgs, newMessage] };
        });
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [userData, backendUrl, selectedTutorId]);

  useEffect(() => {
    console.log("Logged-in user data:", userData);
    fetchTutors();
  }, [backendUrl, userData]);

  // When a tutor is selected, fetch history and join the socket room
  const handleSelectTutor = (id) => {
    console.log("Selected tutor ID:", id);
    setSelectedTutorId(id);
    if (userData) {
      fetchMessages(userData._id, id);
      // Join a room identified by a combination of user and tutor IDs
      const room = `${userData._id}-${id}`;
      socketRef.current.emit("join-room", room);
    }
  };

  // Send a message using Axios to the send API endpoint
  const handleSendMessage = async (newMessage) => {
    if (!selectedTutorId || !userData) {
      console.warn("Missing senderId or receiverId");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/chat/send`, {
        senderId: userData._id,
        receiverId: selectedTutorId,
        message: newMessage,
      });
      console.log("Message response:", response.data);
      if (response.data.success) {
        const sentMessage = response.data.data;
        setMessages((prev) => ({
          ...prev,
          [selectedTutorId]: [...(prev[selectedTutorId] || []), sentMessage],
        }));
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Get the selected tutor object
  const selectedTutor = tutors.find((tutor) => tutor._id === selectedTutorId);
  // Display in sidebar: if a tutor is selected, show only that tutor; otherwise, show all tutors.
  const displayedTutors = selectedTutorId
    ? tutors.filter((t) => t._id === selectedTutorId)
    : tutors;

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Please log in to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar
        tutors={displayedTutors}
        selectedTutorId={selectedTutorId}
        onSelectTutor={handleSelectTutor}
      />
      <ChatWindow
        tutor={selectedTutor}
        messages={messages[selectedTutorId] || []}
        onSendMessage={handleSendMessage}
        currentUserId={userData._id}
      />
    </div>
  );
}

export default Chat;





