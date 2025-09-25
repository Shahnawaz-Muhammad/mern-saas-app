import api from "../utils/axiosInstance";

// ================== AUTH ==================
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

