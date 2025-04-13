


import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChatSidebar } from "./ChatSlider.jsx";
import { ChatWindow } from "./ChatWindows";
import { AppContent } from "../../Context/AppContex";
import axios from "axios";
import io from "socket.io-client";

function Chat() {
  const { userData, backendUrl } = useContext(AppContent);
  const location = useLocation();

  const [tutors, setTutors] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  // 1) Check if a new tutor was passed in via state
  useEffect(() => {
    if (location.state?.tutorId && location.state?.tutorObj) {
      const { tutorId, tutorObj } = location.state;
      setSelectedTutorId(tutorId);

      // Add the new tutor to our local tutors array if it's not already there
      setTutors((prev) => {
        const alreadyExists = prev.some((t) => t._id === tutorId);
        if (!alreadyExists) {
          return [...prev, tutorObj];
        }
        return prev;
      });
    }
  }, [location.state]);

  // 2) After userData is available, set up Socket.IO
  useEffect(() => {
    if (!userData) return;

    socketRef.current = io(backendUrl, {
      auth: { token: localStorage.getItem("token") },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected successfully");
    });

    socketRef.current.on("disconnect", (reason) => {
      console.warn("WebSocket disconnected!", reason);
      if (reason === "io server disconnect") {
        socketRef.current.connect();
      }
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socketRef.current.on("receiveMessage", (newMessage) => {
      const senderIsTutor = newMessage.sentByTutor;
      if (senderIsTutor) {
        fetchMessages(userData._id, newMessage.senderId);
      } else {
        fetchMessages(newMessage.senderId, userData._id);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userData, backendUrl]);

  // 3) Fetch existing conversation tutors from server
  //    Then merge them with any newly-added tutor in local state
  useEffect(() => {
    if (userData) {
      fetchConversationTutors();
    }
  }, [backendUrl, userData]);

  const fetchConversationTutors = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/conversation?userId=${userData._id}`,
        { withCredentials: true }
      );
      if (data.success) {
        // Merge server tutors with any local tutors
        setTutors((prev) => {
          // Make an array of IDs that we already have
          const existingIds = prev.map((t) => t._id);
          // Filter out server tutors that we haven't added
          const newFromServer = data.tutors.filter(
            (t) => !existingIds.includes(t._id)
          );
          return [...prev, ...newFromServer];
        });
      }
    } catch (error) {
      console.error("Error fetching conversation tutors:", error);
    }
  };

  // 4) Fetch messages for a given pair
  const fetchMessages = async (studentId, tutorId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/chat-history?userId1=${studentId}&userId2=${tutorId}`,
        { withCredentials: true }
      );
      setMessages((prev) => ({
        ...prev,
        [tutorId]: Array.isArray(data.data) ? data.data : [],
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // 5) Handle selecting a tutor from the sidebar
  const handleSelectTutor = (tutorId) => {
    setSelectedTutorId(tutorId);
    if (!userData) return;

    fetchMessages(userData._id, tutorId);
    const room = [userData._id, tutorId].sort().join("-");
    if (socketRef.current) {
      socketRef.current.emit("join-room", {
        senderId: userData._id,
        receiverId: tutorId,
      });
      console.log(`Joined room: ${room}`);
    }
  };

  // 6) Handle sending a message
  const handleSendMessage = async (newMessage) => {
    if (!selectedTutorId || !userData) {
      console.warn("Missing senderId or receiverId");
      return;
    }

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      senderId: userData._id,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => ({
      ...prev,
      [selectedTutorId]: [...(prev[selectedTutorId] || []), tempMessage],
    }));

    try {
      const response = await axios.post(
        `${backendUrl}/api/chat/send`,
        {
          senderId: userData._id,
          receiverId: selectedTutorId,
          message: newMessage,
          sentByTutor: false,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        const sentMessage = response.data.data;
        // Replace temp message with the actual message from DB
        setMessages((prev) => ({
          ...prev,
          [selectedTutorId]: prev[selectedTutorId].map((msg) =>
            msg._id === tempMessage._id ? sentMessage : msg
          ),
        }));

        // If brand-new conversation, re-fetch from server to confirm
        const alreadyInList = tutors.some((t) => t._id === selectedTutorId);
        if (!alreadyInList) {
          await fetchConversationTutors();
        }

        // Emit to Socket.IO
        if (socketRef.current) {
          socketRef.current.emit("sendMessage", {
            senderId: userData._id,
            receiverId: selectedTutorId,
            message: newMessage,
            sentByTutor: false,
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove temp message on error
      setMessages((prev) => ({
        ...prev,
        [selectedTutorId]: prev[selectedTutorId].filter(
          (msg) => msg._id !== tempMessage._id
        ),
      }));
    }
  };

  // 7) Identify the selected tutor
  const selectedTutor = tutors.find((t) => t._id === selectedTutorId);

  // 8) If user not logged in, block
  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Please log in to start chatting.</p>
      </div>
    );
  }

  // 9) Render UI
  return (
    <div className="flex h-screen">
      <ChatSidebar
        tutors={tutors}
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
