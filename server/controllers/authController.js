import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      verifyOtp: verificationCode, // Store the verification code
      isVerified: false // Field to check if user has verified email
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending welcome email with verification code
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Tutor Finder',
      text: `Welcome to Tutor Finder! Your account has been created with the email ${email}. Please verify your account using this code: ${verificationCode}`
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "Registration successful, verification code sent to your email." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    // Ensure email is processed in a consistent format, e.g., trimmed and lowercased
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    
    // Log to see if the user was found
    // console.log("User found:", user);

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Log to check password match status
    // console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    if(user.isAccountVerified==false){
      return res.json({ success: false, message: "Account not verifed" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true,
      user: user,
      token: token,
     });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: error.message });
  }

};





export const logout = async (req, res) => {
  try {
    // Clear the authentication token cookie
    res.cookie("token", '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(0)  // Set the cookie to expire immediately
    });

    return res.json({ success: true, message: 'Logged Out' });
  } catch (error) {
    // Correct the typo in 'sucess' to 'success'
    return res.json({ success: false, message: error.message });
  }
};



export const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: 'Account already verified' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log('Generated OTP:', otp);

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();
    console.log('OTP saved to user:', user);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Account Verification OTP',
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.json({ success: false, message: 'Failed to send OTP. Please try again.' });
      }
      console.log('Email sent successfully:', info.response);
      return res.json({
        success: true,
        message: 'Verification OTP sent to your email successfully!',
      });
    });
  } catch (error) {
    console.error('Error in sendVerifyOtp:', error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP." });
    }
    

    user.isAccountVerified = true;
    user.verifyOtp = null;
    

    await user.save();

    return res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const isAuthenticated = (req, res) => {
    try {
        // Assuming authentication check logic here
        return res.status(200).json({
            success: true,
            message: "User is authenticated"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to check authentication"
        });
    }
};



export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: true,
        message: "If the email exists, an OTP has been sent.",
      }); // Prevent email enumeration
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP within 15 minutes to reset your password.`,
    };
    await transporter.sendMail(mailOption);

    return res.json({
      success: true,
      message: "OTP sent to your email successfully!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required.",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(user.resetOtpExpireAt) < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = null;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successfully! You can now log in.",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const updatePassword = async (req, res) => {
  // Destructure the fields from the request body
  const { userId, currentPassword, newPassword, confirmPassword } = req.body;

  // Validate that all fields are provided
  if (!userId || !currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields (userId, current password, new password, and confirm password) are required." 
    });
  }

  // Ensure newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: "New password and confirm password do not match." 
    });
  }

  try {
    // Find the user by the provided userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Check if the provided current password matches the stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    if (user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP." });
    }

    // Optionally, check if the OTP is expired
    if (new Date(user.resetOtpExpireAt) < Date.now()) {
      return res.json({ success: false, message: "OTP has expired." });
    }

    return res.json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
