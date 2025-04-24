


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";
import { createRouteHandler } from "uploadthing/express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js"; 
import bookingRoutes from "./routes/bookingRoutes.js";
import oauthRouter from "./routes/oauthRoutes.js";
// import favoritesRouter from "./routes/favoritesRoutes.js";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadRouter } from "./routes/uploadthing.js";
import paymentRouter from "./routes/paymentRoutes.js"
// import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// Connect to the database
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
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      httpOnly: true, // Cookie is not accessible via JavaScript
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter); 
app.use("/api/auth", oauthRouter);
// app.use("/api/favorites", favoritesRouter);
app.use("/api/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRouter);
// app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.send("API is Working"));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow only your frontend URL
//     methods: ["GET", "POST"],
//     credentials: true, // Allow cookies to be sent
//   },
// });
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Allow both WebSocket and HTTP fallback
});


// Socket.IO authentication middleware using JWT
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Fetch token from the socket connection
  console.log("Received Token:", token); // Debug log

  if (!token) {
    console.error("No token provided!");
    return next(new Error("Authentication Error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user info to the socket
    console.log("Decoded User:", decoded); // Debug log
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return next(new Error("Authentication Error"));
  }
});

// Handle Socket.IO events for real-time chat
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join a private room based on a combination of sender and receiver IDs
  socket.on("join-room", ({ senderId, receiverId }) => {

    const room = [senderId, receiverId].sort().join("-");
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle sending a message via Socket.IO
  socket.on("sendMessage", async ({ senderId, receiverId, message,sentByTutor }) => {
    const room = [senderId, receiverId].sort().join("-");
    console.log("Emitting to room:", room);


    
    io.to(room).emit("receiveMessage",{ senderId, receiverId, message,sentByTutor });

  
    // Debugging
    console.log("Rooms socket is in:", socket.rooms);
  });
  

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(` Server started on PORT: ${port}`);
  console.log(" WebSocket server is running!");
});
