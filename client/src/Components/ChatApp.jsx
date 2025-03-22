import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";

const messagesData = [
  { name: "John", status: "online", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Mary", status: "online", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Alexander", status: "online", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Adam", status: "offline", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Alex", status: "online", img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Larry", status: "online", img: "https://randomuser.me/api/portraits/men/6.jpg" },
];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(messagesData[0]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const timestamp = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kathmandu",
      }).format(new Date());

      setMessages((prev) => ({
        ...prev,
        [selectedUser.name]: [
          ...(prev[selectedUser.name] || []),
          { text: input, sender: "me", timestamp },
        ],
      }));
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto space-y-2">
        <div className="flex items-center space-x-4 pb-4 border-b">
          <img src="https://randomuser.me/api/portraits/women/10.jpg" className="w-10 h-10 rounded-full" alt="Profile" />
          <div>
            <h2 className="font-semibold text-lg">Tutor</h2>
            <p className="text-sm text-gray-500">My Account</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-3 mb-3">Messages</h3>
        {messagesData.map((user, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${selectedUser.name === user.name ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.img} className="w-8 h-8 rounded-full" alt={user.name} />
              <div>
                <h4 className="font-medium text-sm">{user.name}</h4>
                <p className="text-xs text-gray-500 flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  {user.status}
                </p>
              </div>
            </div>
            {index < messagesData.length - 1 && <hr className="my-1 border-gray-300" />}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-3 border-b bg-white">
          <div className="flex items-center space-x-3">
            <img src={selectedUser.img} className="w-8 h-8 rounded-full" alt={selectedUser.name} />
            <div>
              <h4 className="font-semibold text-sm">{selectedUser.name}</h4>
              <p className="text-xs text-green-500">{selectedUser.status}</p>
            </div>
          </div>
          <IoCallOutline className="text-lg cursor-pointer" />
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
          {(messages[selectedUser.name] || []).map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Time below the messages */}
        <div className="p-3 bg-gray-100 text-sm text-center text-gray-500">
          {messages[selectedUser.name] && messages[selectedUser.name].length > 0 ? (
            <p>Last message sent at: {messages[selectedUser.name][messages[selectedUser.name].length - 1].timestamp}</p>
          ) : (
            <p>No messages yet</p>
          )}
        </div>

        {/* Input Box */}
        <div className="flex p-3 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-full outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-full"
            onClick={sendMessage}
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
