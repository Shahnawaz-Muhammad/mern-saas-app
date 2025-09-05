import express from "express";
import { registerUser } from "../controllers.js/authController.js";

const router = express.Router();

// Example route for user login
router.post("/register", registerUser);

export default router;
