import api from "../utils/axiosInstance";

// ================== AUTH ==================
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const updateUserRole = async (userId, role) => {
  const res = await api.put("/admin/users/role", { userId, role });
  return res.data;
};
