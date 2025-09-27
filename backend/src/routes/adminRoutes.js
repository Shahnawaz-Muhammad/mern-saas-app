import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

// User management
router.get("/users", protect, authorizeRoles("superadmin"), getAllUsers);

router.put(
  "/users/role",
  protect,
  authorizeRoles("superadmin"),
  updateUserRole
);

router.delete("/users/:id", protect, authorizeRoles("superadmin"), deleteUser);

// Restaurant management
// router.get("/restaurants", protect, isSuperAdmin, getAllRestaurants);
// router.put(
//   "/restaurants/:id/approve",
//   protect,
//   isSuperAdmin,
//   approveRestaurant
// );
// router.put(
//   "/restaurants/:id/decline",
//   protect,
//   isSuperAdmin,
//   declineRestaurant
// );

export default router;
