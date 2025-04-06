import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { AppContent } from "../../../Context/AppContex";
import { Send } from "lucide-react";

function TutorMessages() {
  const { userData, backendUrl } = useContext(AppContent);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  // Fetch list of students who contacted the tutor
  // const fetchStudents = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/user/students`);
  //     // Set default messageCount to 3 if not provided
  //     const studentsWithMessageCount = data.students.map((student) => ({
  //       ...student,
  //       messageCount: student.messageCount || 3,
  //     }));
  //     setStudents(studentsWithMessageCount);
  //     console.log("Students Data:", studentsWithMessageCount);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // };


  const fetchConversationStudents = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/conversation?userId=${userData._id}`,
        { withCredentials: true }
      );
      if (data.success) {
        setStudents(data.tutors); // Only students with a chat history
      }
    } catch (error) {
      console.error("Error fetching conversation students:", error);
    }
  };

  // Fetch chat history between tutor and a student
  const fetchMessages = async (tutorId, studentId) => {
    try {
      console.log(
        `Fetching messages for tutorId: ${tutorId}, studentId: ${studentId}`
      );
      const { data } = await axios.get(
        `${backendUrl}/api/chat/chat-history?userId1=${tutorId}&userId2=${studentId}`
      );
      setMessages((prev) => ({
        ...prev,
        [studentId]: Array.isArray(data.data) ? data.data : [],
      }));
      console.log("Fetched messages:", data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Initialize Socket.IO connection and listen for incoming messages
  useEffect(() => {
    if (userData) {
      const token = localStorage.getItem("token");
      if (userData && token) {
        socketRef.current = io(backendUrl, {
          auth: { token },
          transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
          console.log("WebSocket connected successfully");
        });

        socketRef.current.on("receiveMessage", (newMessage) => {
          const senderIsTutor = newMessage.sentByTutor;
          if (senderIsTutor) {
            fetchMessages(newMessage.senderId, userData._id);
          } else {
            fetchMessages(userData._id, newMessage.senderId);
          }
        });
      }
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [userData, backendUrl]);

  useEffect(() => {
    if (userData) {
      console.log("User Data in TutorMessages:", userData);
      fetchConversationStudents();
    }
  }, [userData]);

  // When a student is selected, fetch chat history and join the corresponding room
  const handleSelectStudent = (studentId) => {
    console.log("studentId", studentId);
    setSelectedStudentId(studentId);
    if (userData) {
      fetchMessages(userData._id, studentId);
      const room = [studentId, userData._id].sort().join("-");
      if (socketRef.current)
        socketRef.current.emit("join-room", {
          senderId: userData._id,
          receiverId: studentId,
        });
      console.log(`Joined room: ${room}`);
    }
  };

  // Optimistic update: immediately add the message to state before server response
  const handleSendMessage = async (newMessage) => {
    if (!selectedStudentId || !userData) {
      console.warn("Missing tutor ID or student ID");
      return;
    }

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      senderId: userData._id,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update to UI
    setMessages((prev) => ({
      ...prev,
      [selectedStudentId]: [...(prev[selectedStudentId] || []), tempMessage],
    }));

    try {
      const response = await axios.post(`${backendUrl}/api/chat/send`, {
        senderId: userData._id,
        receiverId: selectedStudentId,
        message: newMessage,
      });

      if (response.data.success) {
        const sentMessage = response.data.data;
        // Replace temporary message with the sent message
        setMessages((prev) => ({
          ...prev,
          [selectedStudentId]: prev[selectedStudentId].map((msg) =>
            msg._id === tempMessage._id ? sentMessage : msg
          ),
        }));

        // Decrement message count after sending
        setStudents((prev) =>
          prev.map((student) => {
            if (student._id === selectedStudentId) {
              return { ...student, messageCount: student.messageCount - 1 };
            }
            return student;
          })
        );

        if (socketRef.current) {
          console.log("emittingSendMessage");

          const sender = userData._id;
          const receiverId = selectedStudentId;

          socketRef.current.emit("sendMessage", {
            senderId: sender,
            receiverId: receiverId,
            message: newMessage,
            sentByTutor: true,
          });
        }
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
      // Remove the temporary message in case of error
      setMessages((prev) => ({
        ...prev,
        [selectedStudentId]: prev[selectedStudentId].filter(
          (msg) => msg._id !== tempMessage._id
        ),
      }));
    }
  };

  const selectedStudent = students.find(
    (student) =>
      student._id === selectedStudentId || student.id === selectedStudentId
  );
  console.log("Selected student:", selectedStudent);

  return (
    <div className="flex h-screen">
      {/* Sidebar: List of Students */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-4">Students</h1>
          <div className="space-y-3">
            {students.map((student) => (
              <button
                key={student._id || student.id}
                onClick={() => handleSelectStudent(student._id || student.id)}
                className={`flex items-center space-x-3 p-3 w-full text-left rounded-lg transition-colors ${
                  selectedStudentId === (student._id || student.id)
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      student?.profile
                        ? `https://utfs.io/f/${student.profile}`
                        : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                    }
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {student.messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {student.messageCount}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-800">{student.name}</h2>
                  <p className="text-sm text-gray-500">
                    {student.lastActive || ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          {selectedStudent ? (
            <div className="flex items-center space-x-3">
              <img
                src={
                  selectedStudent.profile
                    ? `https://utfs.io/f/${selectedStudent.profile}`
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                }
                alt={selectedStudent.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-medium text-gray-800">
                  {selectedStudent.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedStudent.address || "Address not provided"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a student to start chatting</p>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedStudent ? (
            (messages[selectedStudentId] || []).map((msg, index) => {
              const senderId =
                typeof msg.sender === "object" ? msg.sender._id : msg.sender;
              const isSender = String(senderId) === String(userData._id);
              const formatTime = (timestamp) => {
                const date = new Date(timestamp);
                return isNaN(date.getTime())
                  ? "Invalid Date"
                  : date.toLocaleTimeString();
              };
              return (
                <div
                  key={msg._id ? `${msg._id}-${index}` : `msg-${index}`}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isSender ? "bg-blue-600 text-white" : "bg-gray-100"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatTime(msg.timestamp || msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No conversation selected</p>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

function ChatInput({ onSendMessage }) {
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}

export default TutorMessages;
