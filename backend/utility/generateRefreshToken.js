import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
// Function to generate Refresh Token
const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    { id: userId }, // payload
    process.env.SECRET_KEY_REFRESH_TOKEN, // secret from .env
    { expiresIn: "30d" } // refresh token expiration: 30 days
  );
  return refreshToken;
};

export default generateRefreshToken;
