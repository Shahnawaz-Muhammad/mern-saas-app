import User from "../models/User.js";

// @desc   Get all users (customers, admins, restaurant owners)
// @route  GET /api/admin/users
// @access SuperAdmin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update a user role (e.g., promote to admin, demote to user)
// @route  PUT /api/admin/users/:id/role
// @access SuperAdmin
const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete a user
// @route  DELETE /api/admin/users/:id
// @access SuperAdmin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all restaurants (pending + approved + declined)
// @route  GET /api/admin/restaurants
// @access SuperAdmin
export const getAllRestaurants = (req, res) => {
  res.status(200).json({
    message: "Fetched all restaurants (pending/approved/declined)",
  });
};

// @desc   Approve a restaurant registration
// @route  PUT /api/admin/restaurants/:id/approve
// @access SuperAdmin
export const approveRestaurant = (req, res) => {
  res.status(200).json({
    message: `Restaurant with ID ${req.params.id} approved successfully`,
  });
};

// @desc   Decline a restaurant registration
// @route  PUT /api/admin/restaurants/:id/decline
// @access SuperAdmin
export const declineRestaurant = (req, res) => {
  res.status(200).json({
    message: `Restaurant with ID ${req.params.id} declined`,
  });
};

// @desc   Platform overview stats (total users, restaurants, orders, revenue)
// @route  GET /api/admin/stats
// @access SuperAdmin
export const getPlatformStats = (req, res) => {
  res.status(200).json({
    message: "Fetched platform overview stats",
  });
};

export { getAllUsers, updateUserRole, deleteUser };
