import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        window.location.href = "/login"; // if refresh fails, logout
      }
    }

    return Promise.reject(error);
  }
);

export default api;
