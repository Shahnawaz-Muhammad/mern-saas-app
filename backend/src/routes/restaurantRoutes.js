import express from "express";
import {
  registerRestaurant,
  getMyRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantById,
} from "../controllers/restaurantController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

// Owner-only
router.get("/me", protect, isAdmin, getMyRestaurant);
router.put("/me", protect, isAdmin, updateRestaurant);
router.delete("/me", protect, isAdmin, deleteRestaurant);

export default router;
