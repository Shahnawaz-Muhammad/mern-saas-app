import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send cookies
});

// Interceptor: if 401, try refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh"); // get new access token
        return api(originalRequest);     // retry the request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // ❌ DON'T do window.location.href here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
