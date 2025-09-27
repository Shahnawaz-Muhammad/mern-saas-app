

import Restaurant from "../models/Restaurant";
import asyncHandler from "express-async-handler"
// @desc   Register a new restaurant (pending approval)
// @route  POST /api/restaurants/register
// @access Public
const registerRestaurant = asyncHandler(async (req, res) => {
  const { name, description, logo, address, phone, openingHours } = req.body;

  const restaurant = await Restaurant.create({
    owner: req.user_id,
    name,
    description,
    logo,
    address,
    phone,
    openingHours
  })
  res.status(201).json({
    message:
      "Restaurant registered successfully (pending approval by SuperAdmin)",
    restaurant,
  });
});

// @desc   Get restaurant details for logged-in owner
// @route  GET /api/restaurants/me
// @access Admin (Restaurant Owner)
export const getMyRestaurant = asyncHandler(async (req, res) => {
  // `req.user._id` comes from auth middleware (protect)
  const restaurant = await Restaurant.findOne({ owner: req.user._id });

  if (!restaurant) {
    res.status(404);
    throw new Error("You don't have a registered restaurant");
  } 
  
  res.status(200).json({
    message: "Fetched restaurant details for current owner",
  });
});

// @desc   Update restaurant details for logged-in owner
// @route  PUT /api/restaurants/me
// @access Admin (Restaurant Owner)
const updateRestaurant = (req, res) => {
  res.status(200).json({
    message: "Restaurant details updated successfully",
  });
};

// @desc   Delete restaurant (soft delete or hard delete later)
// @route  DELETE /api/restaurants/me
// @access Admin (Restaurant Owner)
const deleteRestaurant = (req, res) => {
  res.status(200).json({
    message: "Restaurant deleted successfully",
  });
};

// @desc   Get all approved restaurants (public API)
// @route  GET /api/restaurants
// @access Public
const getAllRestaurants = (req, res) => {
  res.status(200).json({
    message: "Fetched list of all approved restaurants",
  });
};

// @desc   Get single restaurant details by ID
// @route  GET /api/restaurants/:id
// @access Public
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate(
    "owner",
    "name email"
  );

  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  // Public users should only see approved restaurants
  if (
    restaurant.status !== "approved" &&
    (!req.user ||
      (req.user.role !== "admin" &&
        req.user.role !== "superadmin" &&
        restaurant.owner._id.toString() !== req.user._id.toString()))
  ) {
    res.status(403);
    throw new Error("You are not authorized to view this restaurant");
  }


  res.status(200).json({
    message: `Fetched restaurant details successfully`,
  });
});

export {
  registerRestaurant,
  getMyRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantById,
};
