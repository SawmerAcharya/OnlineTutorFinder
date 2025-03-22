// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import cookieParser from "cookie-parser";


// import connectDB from "./config/db.js";
// import authRouter from "./routes/authRoutes.js";
// import { createRouteHandler } from "uploadthing/express";
// import { uploadRouter } from "./routes/uploadthing.js";
// import userRouter from "./routes/userRoutes.js";

// const app = express();

// const port = process.env.PORT || 5001;

// connectDB();

// const allowedOrigins = ['http://localhost:3000']; 

// app.use(express.json());
// app.use(cookieParser());



// // Configure CORS to allow credentials
// app.use(
//   cors({
//     origin: allowedOrigins, // Allow only specific frontend
//     credentials: true, // Allow cookies to be sent
//   })
// );


// app.use(
//   "/api/uploadthing",
//   createRouteHandler({
//     router: uploadRouter
//   }),
// );

// // Debugging message
// console.log("CORS configured for", allowedOrigins);

// // API Endpoints
// app.get("/", (req, res) => res.send("API is Working "));
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);



// app.listen(port, () => console.log(`Server started on PORT:${port}`));

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createRouteHandler } from "uploadthing/express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js"; // Chat routes
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadRouter } from "./routes/uploadthing.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// Connect to database
connectDB();

// Allowed Origins for Express CORS (your frontend runs on port 3000)
const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/uploadthing", createRouteHandler({ router: uploadRouter }));

app.get("/", (req, res) => res.send("API is Working"));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO authentication middleware using JWT
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication Error"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("Authentication Error"));
  }
});

// Handle Socket.IO events for real-time chat
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("sendMessage", async ({ room, senderId, receiverId, message }) => {
    try {
      const { default: Chat } = await import("./models/chatModel.js");
      const newMessage = new Chat({ sender: senderId, receiver: receiverId, message });
      await newMessage.save();
      console.log("Saved Message:", newMessage);

      io.to(room).emit("receiveMessage", {
        senderId,
        message,
        timestamp: newMessage.createdAt,
        _id: newMessage._id,
      });
    } catch (error) {
      console.error("Error saving message to MongoDB:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => console.log(`Server started on PORT: ${port}`));