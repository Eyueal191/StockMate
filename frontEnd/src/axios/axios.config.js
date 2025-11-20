// utils/axios.js
import axios from "axios";

// ✅ Create a single Axios instance
const Axios = axios.create({
  baseURL: "http://localhost:8000", // your backend URL
  timeout: 60000,                   // 60 seconds timeout
  withCredentials: true,            // sends cookies (refreshToken) automatically
});

// ✅ Request interceptor – attach access token if available
Axios.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor – handle expired access token and refresh
Axios.interceptors.response.use(
  (response) => response, // return successful responses as is
  async (error) => {
    const originalRequest = error.config;
    const response = error.response;

    if (!response) return Promise.reject(error); // network errors

    // 🔁 Case 1: Access token expired
    if (
      response.status === 401 &&
      response.data?.message?.toLowerCase().includes("access token has expired")
    ) {
      if (!originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          // call refresh endpoint (sends refreshToken cookie automatically)
          const refreshResponse = await Axios.get("/api/user/refresh-access-token", {
            withCredentials: true,
          });

          const newToken = refreshResponse.data?.accessToken;
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            originalRequest.headers["authorization"] = `Bearer ${newToken}`;
            return Axios(originalRequest); // retry original request
          } else {
            throw new Error("No new access token received");
          }
        } catch (refreshError) {
          // failed to refresh → force logout
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    // 🔒 Case 2: Refresh token expired or invalid
    if (
      response.status === 401 &&
      response.data?.message?.toLowerCase().includes("refresh token expired")
    ) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error); // other errors
  }
);
export default Axios;
