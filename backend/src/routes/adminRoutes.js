import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  authorizeRoles("admin", "superadmin"),
  getAllUsers
);

router.put(
  "/users/role",
  protect,
  authorizeRoles("superadmin"),
  updateUserRole
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("superadmin"),
  deleteUser
);

export default router;
