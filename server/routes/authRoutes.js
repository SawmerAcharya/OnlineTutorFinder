import express from 'express';
import { login, register, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, verifyResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import passport from "../config/passport.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { updatePassword } from '../controllers/authController.js';
const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.put('/update-password',userAuth, updatePassword);
authRouter.post('/verify-reset-otp', verifyResetOtp);


authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const { id, displayName, email } = req.user;
      console.log("req.user",req.user)
      //const email = emails; // Extract email from Google profile

      let user = await userModel.findOne({ email });

      if (!user) {
        // If user does not exist, create a new user
        user = new userModel({
          name: displayName,
          email,
          password: "", // No password required for Google login
          isAccountVerified: true, // Google accounts are pre-verified
          googleId: id, // Store Google ID for reference
        });

        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      if (user.isAdmin) {
        return res.redirect("http://localhost:3000/admin");
      } else if (user.role === "tutor") {
        if (user.tutorData?.status === "approved") {
          return res.redirect("http://localhost:3000/tutor");
        } else if (user.tutorData?.status === "pending") {
          return res.redirect("http://localhost:3000/Pending");
        } else {
          return res.redirect("http://localhost:3000/Rejected");
        }
      } else {
        return res.redirect("http://localhost:3000/");
      }
    } catch (error) {
      console.error("Error in Google authentication:", error);
      res.redirect("http://localhost:3000/login");
    }
  }
);


export default authRouter;