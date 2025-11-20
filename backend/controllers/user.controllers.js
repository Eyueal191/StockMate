import sendEmail from "../config/resend.js";
import User from "../models/user.js";
import generateAccessToken from "../utility/generateAccessToken.js";
import verifyRefreshToken from "../utility/verfiyRefreshToken.js";
import generateRefreshToken from "../utility/generateRefreshToken.js";
import verifyAccessToken from "../utility/verifyAccessToken.js";
import  hashPassword from "../utility/hashPassword.js"
import otpTemplate from "../utility/otpTemplate.js";
import comparePassword from "../utility/comparePassword.js";
// ====================
// User Controller
// ====================
// 1. Sign Up
const signUp = async (req, res, next) => {
  try {
    const {name, email, password}=req.body;
    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(400).json({message:"User with this email already exist", error:true, success:false})
    }
    let hashedPassword = await hashPassword(password);
    const verifyEmailOTP = Math.floor(1000 + Math.random() * 9000);

    let user = await User.create({name, email, password:hashedPassword, verifyEmailOTP})
    user.verifyEmailOTPExpiryDate=new Date(new Date() + 15*60*1000) // after 15 minutes
    await user.save();
    let html = otpTemplate(verifyEmailOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
    to: email,
    subject:"Verify your Email",
    html
});
    return res.status(201).json({ message: "You've registered successfully. Please check your email to verify", error:false, success:true});
  } catch (err) {
    next(err);
  }
};
// 3. Verify Email OTP
const verifyEmailOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const now = new Date();
    // Validate OTP and expiry
    if (
      user.verifyEmailOTP !== Number(otp) ||
      user.verifyEmailOTPExpiryDate < now
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        success: false,
        error: true,
      });
    }

    // Mark user as verified
    user.verified = true;
    user.verifyEmailOTP = null;
    user.verifyEmailOTPExpiryDate = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });

  } catch (err) {
    next(err);
  }
};
// 2. resendEmailOTP
const resendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email doesn't exist",
        error: true,
        success: false,
      });
    }
    // Generate new OTP and expiry
    const verifyEmailOTP = Math.floor(1000 + Math.random() * 9000);
    user.verifyEmailOTP = verifyEmailOTP;
    user.verifyEmailOTPExpiryDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();
    // Send OTP email
    const html = otpTemplate(verifyEmailOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
      to: email,
      subject: "Verify your Email",
      html,
    });

    return res.status(201).json({
      message: "A new OTP has been sent to your email. Please check your email to verify.",
      error: false,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// 3. Log In
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Unregistered email",
        success: false,
        error: true,
      });
    }
    // Check password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect credentials",
        success: false,
        error: true,
      });
    }
    // Generate tokens
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    // Save tokens in user document
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    // Set refresh token in HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true if HTTPS
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      message: "Logged in successfully",
      error: false,
      success: true,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
// 4. Forgot Password OTP
const forgotPasswordOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User with this email is not registered",
        error: true,
        success: false,
      });

    // Generate OTP
    const forgotPasswordOTP = Math.floor(1000 + Math.random() * 9000);
    user.forgotPasswordOTP = forgotPasswordOTP;

    // Correct expiry date (15 minutes from now)
    const forgotPasswordOTPExpiryDate = new Date(Date.now() + 15 * 60 * 1000);
    user.forgotPasswordOTPExpiryDate = forgotPasswordOTPExpiryDate;

    // Save user
    await user.save();

    // Send OTP email
    const html = otpTemplate(forgotPasswordOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
      to: email,
      subject: "Reset your Password OTP",
      html,
    });

    return res.status(201).json({
      message: "A new OTP has been sent to your email. Please check your email to verify.",
      error: false,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
// 5. Verify Password OTP
const verifyPasswordOtp = async (req, res, next) => {
  try {
   const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const now = new Date();
    // Validate OTP and expiry
    if (
      user.forgotPasswordOTP!== Number(otp) ||
      user.forgotPasswordOTPExpiryDate < now
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        success: false,
        error: true,
      });
    }
    // Mark user as verified
    user.forgotPasswordOTP = null;
    user.forgotPasswordOTPExpiryDate = null;
    await user.save();
    return res.status(200).json({
      message: "Verified successfully, you can now reset your password",
      success: true,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
// 6. Refresh Access Token
const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = res.cookies;
    let user = await user.finOne({refreshToken})
     if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    let accessToken =  generateAccessToken(user._id);
    let newRefreshToken = generateRefreshToken(user._id);
    user.accessToken=accessToken;
    user.refreshToken=newRefreshToken;
    return res.status(201).json({ message: "Refresh Access Token endpoint" });
  } catch (err) {
    next(err);
  }
};
// 7. Password Reset
const passwordReset = async (req, res, next) => {
  try {
    const {email, password} =req.body
       const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    let hashedPassword = await hashPassword(password);
    user.password=hashedPassword;
    await user.save();
     await user.save();

    return res.status(200).json({
      message: "Your password has been changed successfully",
      error: false,
      success: true,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export {
  signUp,
  logIn,
  verifyEmailOtp,
  resendEmailOtp,
  forgotPasswordOtp,
  verifyPasswordOtp,
  refreshAccessToken,
  passwordReset,
};
