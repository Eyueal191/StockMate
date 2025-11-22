import express from "express";
import {
  signUp,
  logIn,
  verifyEmailOtp,
  resendEmailOtp,
  forgotPasswordOtp,
  verifyPasswordOtp,
  passwordReset,
  logOut,getUsersList, updateUser
} from "../controllers/user.controllers.js";
const userRoutes = express.Router();

// Authentication Routes
userRoutes.post("/register", signUp);                   // Register (Sign Up)
userRoutes.post("/login", logIn);                      // Login
userRoutes.post("/verify-email-otp", verifyEmailOtp);  // Verify Email OTP
userRoutes.post("/resend-email-otp", resendEmailOtp);  // Resend Email OTP
userRoutes.post("/forgot-password-otp", forgotPasswordOtp); // Forgot Password OTP
userRoutes.post("/verify-password-otp", verifyPasswordOtp); // Verify Password OTP
userRoutes.put("/password-reset", passwordReset);      // Password 
userRoutes.put("/update-user", updateUser);
userRoutes.get("/logout", logOut);                     // Logout
userRoutes.get("/", getUsersList)

export default userRoutes;
