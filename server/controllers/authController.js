// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from '../models/userModel.js';
// import transporter from '../config/nodemailer.js';

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }

//   try {
//     const existingUser = await userModel.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

//     const user = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       verifyOtp: verificationCode, // Store the verification code
//       isVerified: false // Field to check if user has verified email
//     });

//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     // Sending welcome email with verification code
//     const mailOption = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: 'Welcome to Tutor Finder',
//       text: `Welcome to Tutor Finder! Your account has been created with the email ${email}. Please verify your account using this code: ${verificationCode}`
//     };

//     await transporter.sendMail(mailOption);

//     return res.json({ success: true, message: "Registration successful, verification code sent to your email." });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };





// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Email and Password are required",
//     });
//   }

//   try {
//     // Ensure email is processed in a consistent format, e.g., trimmed and lowercased
//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await userModel.findOne({ email: normalizedEmail });
    
//     // Log to see if the user was found
//     // console.log("User found:", user);

//     if (!user) {
//       return res.json({ success: false, message: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     // Log to check password match status
//     // console.log("Password match:", isMatch);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }
//     if(user.isAccountVerified==false){
//       return res.json({ success: false, message: "Account not verifed" });
//     }
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     // Clear the authentication token cookie
//     res.cookie("token", '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       expires: new Date(0)  // Set the cookie to expire immediately
//     });

//     return res.json({ success: true, message: 'Logged Out' });
//   } catch (error) {
//     // Correct the typo in 'sucess' to 'success'
//     return res.json({ success: false, message: error.message });
//   }
// };



// export const sendVerifyOtp = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: 'User not found' });
//     }

//     if (user.isAccountVerified) {
//       return res.json({ success: false, message: 'Account already verified' });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     console.log('Generated OTP:', otp);

//     user.verifyOtp = otp;
//     user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
//     await user.save();
//     console.log('OTP saved to user:', user);

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: user.email,
//       subject: 'Account Verification OTP',
//       text: `Your OTP is ${otp}. Verify your account using this OTP.`,
//     };

//     await transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error('Error sending email:', err);
//         return res.json({ success: false, message: 'Failed to send OTP. Please try again.' });
//       }
//       console.log('Email sent successfully:', info.response);
//       return res.json({
//         success: true,
//         message: 'Verification OTP sent to your email successfully!',
//       });
//     });
//   } catch (error) {
//     console.error('Error in sendVerifyOtp:', error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const verifyEmail = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.json({ success: false, message: "Email and OTP are required." });
//   }

//   try {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found." });
//     }

//     if (user.verifyOtp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP." });
//     }
    

//     user.isAccountVerified = true;
//     user.verifyOtp = null;
    

//     await user.save();

//     return res.json({ success: true, message: "Email verified successfully!" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const isAuthenticated = (req, res) => {
//     try {
//         // Assuming authentication check logic here
//         return res.status(200).json({
//             success: true,
//             message: "User is authenticated"
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Failed to check authentication"
//         });
//     }
// };



// export const sendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.json({ success: false, message: "Email is required" });
//   }

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: true,
//         message: "If the email exists, an OTP has been sent.",
//       }); // Prevent email enumeration
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     user.resetOtp = otp;
//     user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
//     await user.save();

//     const mailOption = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for resetting your password is ${otp}. Use this OTP within 15 minutes to reset your password.`,
//     };
//     await transporter.sendMail(mailOption);

//     return res.json({
//       success: true,
//       message: "OTP sent to your email successfully!",
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Verify OTP and Reset Password
// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.json({
//       success: false,
//       message: "Email, OTP, and new password are required.",
//     });
//   }

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     if (user.resetOtp === "" || user.resetOtp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     if (new Date(user.resetOtpExpireAt) < Date.now()) {
//       return res.json({ success: false, message: "OTP has expired" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetOtp = "";
//     user.resetOtpExpireAt = null;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Password reset successfully! You can now log in.",
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ sucess: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });

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

    //sending welcome email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Online Tutor finder',
      text: `Welcome to Online tutor finder website. Your account has been create with email id: ${email}`
    }

    await transporter.sendMail(mailOption);

    return res.json({ success: true });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Email and Password are required",
//     });
//   }
//   try {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       res.json({ sucess: false, message: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       res.json({ sucess: false, message: "Invalid password" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true });
//   } catch (error) {
//     res.json({ sucess: false, message: error.message });
//   }
// };


// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Email and Password are required",
//     });
//   }

//   try {
//     // Normalize email for consistent searching
//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await userModel.findOne({ email: normalizedEmail });
//     console.log("User found:", user);

//     if (!user) {
//       return res.json({ success: false, message: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match:", isMatch);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }

//     // Get the first letter of the name
//     const initial = user.name ? user.name[0].toUpperCase() : '';  // Ensure the initial is uppercase

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       message: "Login successful",
//       initial: initial  // Include the initial in the response
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Email and Password are required",
//     });
//   }

//   try {
//     // Ensure email is processed in a consistent format, e.g., trimmed and lowercased
//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await userModel.findOne({ email: normalizedEmail });
    
//     // Log to see if the user was found
//     console.log("User found:", user);

//     if (!user) {
//       return res.json({ success: false, message: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     // Log to check password match status
//     console.log("Password match:", isMatch);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
    return res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};





// export const logout = async (req, res) => {
  
//   try {
   

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true, message: 'Logged Out' });
//   } catch (error) {
//     res.json({ sucess: false, message: error.message });
//   }
// };  


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


// export const sendVerifyOtp = async (req, res) => {
//   try {

//     const {userId}=req.body

//     const user = await userModel.findById(userId);

//     if (user.isAccountVerified){
//       return res.json({ success: false, message: 'Account verified' });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     user.verifyOtp = otp;

//     user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

//     await user.save();

//     const mailOption = {

//       from: process.env.SENDER_EMAIL,
//       to: user.email,
//       subject: 'Account Verification OTP',
//       text: `Your OTP is ${otp}. Verify your account using this OTP. `

//     }

//     await transporter.sendMail(mailOption);

//     return res.json({ success: true, message: 'Verification OTP sent on Email' });
//   } catch (error) {
//     // Correct the typo in 'sucess' to 'success'
//     return res.json({ success: false, message: error.message });
//   }
// };

//verifying the email using otp

// Send Verification OTP
export const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };
    await transporter.sendMail(mailOption);

    return res.json({
      success: true,
      message: "Verification OTP sent to your email successfully!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// export const verifyEmail = async (req, res) => {
//   const {userId, otp} = req.body;

//   if (!userId || !otp){
//     res.json({ success: false, message: 'Missing Details' });

//   }
//   try{
//     const user = await userModel.findById(userId);

//     if(!user){
//       res.json({ success: false, message: 'user not found' });

//     }
//     if (user.verifyOtp === '' || user.verifyOtp !== otp){
//       return res.json({ success: false, message: 'Invalid OTP' });
//     }

//     if (user.verifyOtpExpireAt < Date.now()){
//       return res.json({ success: false, message: 'OTP Expired' });
//     }

//     user.isAccountVerified = true;
//     user.verifyOtp = '';
//     user.verifyOtpExpireAt = 0;

//     await user.save();
//     return res.json({ sucess: true, message: 'Email verified sucessfully' });


//   }catch{
//     res.json({ success: false, message: error.message });
//   }
// };

// Verify Email Using OTP
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(user.verifyOtpExpireAt) < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = null;
    await user.save();

    return res.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res)=>{
  try{

    return res.json({success: true});

  }catch{
    res.json({success: false, message: error.message})
  }
}

//Send password reset otp
// export const sendResetOtp = async (req, res)=>{

//   const {email} = req.body;

//   if (!email){

//     return res.json({ success: false, message: 'Email is required' });
//   }
//   try{

//     const user = await userModel.findOne({email});
//     if(!user){
//       return res.json({ success: false, message: 'User not found' });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     user.resetOtp = otp;

//     user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

//     await user.save();

//     const mailOption = {

//       from: process.env.SENDER_EMAIL,
//       to: user.email,
//       subject: 'Password Reset OTP',
//       text: ` Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password. `

//     }

//     await transporter.sendMail(mailOption);

//     return res.json({success: true, message: 'OTP sent to your email'});

//   }catch(error){
//     res.json({success: false, message: error.message})
//   }
// }


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

// export const resetPassword = async (req, res )=>{
//   const {email, otp, newPassword} = req.body;

//   if (!email || !otp || !newPassword){
//     return res.json({success: false, message: 'Email, OTP, and new password are required.'});

//   }
//   try{

//     const user = await userModel.findOne({email});

//     if (!user){
//       return res.json({success: false, message: 'User not found'});
//     }

//     if (user.resetOtp === "" || user.resetOtp !==otp){
//       return res.json({success: false, message: 'Invalid OTP'});
//     }

//     if (user.resetOtpExpireAt < Date.now()){
//       return res.json({success: false, message: 'OTP Expired'});
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetOtp = '';
//     user.resetOtpExpireAt = 0;

//     await user.save();

//     return res.json({success: true, message: 'Password has been reset sucessfully!'});

//   }catch(error){
//     res.json({success: false, message: error.message})

//   }
// }

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