import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./routes/uploadthing.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

connectDB();

const allowedOrigins = ['http://localhost:3000']; 

app.use(express.json());
app.use(cookieParser());



// Configure CORS to allow credentials
app.use(
  cors({
    origin: allowedOrigins, // Allow only specific frontend
    credentials: true, // Allow cookies to be sent
  })
);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter
  }),
);

// Debugging message
console.log("CORS configured for", allowedOrigins);

// API Endpoints
app.get("/", (req, res) => res.send("API is Working "));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
