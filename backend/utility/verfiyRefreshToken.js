import jwt from "jsonwebtoken";
// Function to verify Refresh Token
const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    return { valid: true, decoded }; // payload if valid
  } catch (error) {
    return { valid: false, error: error.message }; // error message if invalid/expired
  }
};
export default verifyRefreshToken;
