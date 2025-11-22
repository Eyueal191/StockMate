import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyEmailOTP: { type: Number },
    verifyEmailOTPExpiryDate: { type: Date },
    verified: { type: Boolean, default: false },
    forgotPasswordOTP: { type: Number },
    forgotPasswordOTPExpiryDate: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    staff: { type: Boolean },
    adminRoleGranted: { type: Boolean },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
