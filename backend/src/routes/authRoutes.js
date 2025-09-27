import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { refreshAccessToken } from "../utils/refreshToken.js";

const router = express.Router();

// Example route for user login
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/profile", protect, getUserProfile);
router.post("/logout", logoutUser);

export default router;
