import express from "express";
import {
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/:restaurantId", getRestaurantMenu);
router.get("/item/:id", getMenuItemById);

// Owner-only routes
router.post("/", protect, isAdmin, createMenuItem);
router.put("/:id", protect, isAdmin, updateMenuItem);
router.delete("/:id", protect, isAdmin, deleteMenuItem);

export default router;
