import express from "express";
import {
  placeOrder,
  getMyOrders,
  getRestaurantOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, placeOrder);
router.get("/me", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Restaurant owner routes
router.get("/restaurant/all", protect, isAdmin, getRestaurantOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;
