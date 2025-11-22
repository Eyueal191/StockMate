const userApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    signUp: {
      method: "POST",
      url: "/api/user/register",
    },
    logIn: {
      method: "POST",
      url: "/api/user/login",
    },
    verifyEmailOtp: {
      method: "POST",
      url: "/api/user/verify-email-otp",
    },
    resendEmailOtp: {
      method: "POST",
      url: "/api/user/resend-email-otp",
    },
    forgotPasswordOtp: {
      method: "POST",
      url: "/api/user/forgot-password-otp",
    },
    verifyPasswordOtp: {
      method: "POST",
      url: "/api/user/verify-password-otp",
    },
    passwordReset: {
      method: "PUT",
      url: "/api/user/password-reset",
    },
  },
};
export default userApiSummary;