// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send cookies/jwt automatically
});

// ================== AUTH ==================
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const logoutUser = () => API.post("/auth/logout");
export const registerUser = (data) => API.post("/auth/register", data);
export const getProfile = () => API.get("/auth/profile");

export default API;
