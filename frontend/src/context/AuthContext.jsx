// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log("Session expired or not logged in", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // only fetch if not login/register page AND no user yet
  if (!["/login", "/register"].includes(location.pathname) && !user) {
    fetchUser();
  } else {
    setLoading(false);
  }
}, [location.pathname]);



  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      return res.data.user;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      console.log("Logout response:", res.data);
    } catch (err) {
      console.error("Logout failed:", err);
      throw err; // rethrow if truly an error
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
