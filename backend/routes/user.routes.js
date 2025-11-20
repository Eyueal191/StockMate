/**
 * @fileoverview Express router for user authentication routes.
 * Defines endpoints for registration, login, verification, password reset, and token refresh.
 */

import express from "express";
import {
  signUp,
  resendEmailOtp, // Corrected import name to match the controller file
  logIn,
  verifyEmailOtp,
  forgotPasswordOtp,
  verifyPasswordOtp,
  refreshAccessToken,
  passwordReset,
} from "../controllers/user.controllers.js";

const userRoutes = express.Router();

// ====================
// Authentication Routes
// ====================

// 1. Sign Up
userRoutes.post("/register", signUp);

// 2. Log In
userRoutes.post("/login", logIn);

// 3. Verify Email OTP
userRoutes.post("/verify-email-otp", verifyEmailOtp);

// 4. Resend Email OTP (Replaced the incorrect function name)
userRoutes.post("/resend-email-otp", resendEmailOtp);

// 5. Forgot Password OTP
userRoutes.post("/forgot-password-otp", forgotPasswordOtp);

// 6. Verify Password OTP
userRoutes.post("/verify-password-otp", verifyPasswordOtp);

// 7. Password Reset (Using PUT as it modifies a resource)
userRoutes.put("/password-reset", passwordReset);

// 8. Refresh Access Token (Using GET as it retrieves a new token pair based on the existing cookie)
userRoutes.get("/refresh-access-token", refreshAccessToken);


export default userRoutes;