import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_SERVER_URL || "http://localhost:5000/api",
});

// Attach Authorization Token to Every Request
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

// Auth API Calls
export const login = (userData) => API.post("/auth/login", userData);
export const register = (userData) => API.post("/auth/register", userData);

// User API Calls
export const updateUserProfile = (userData) => API.put("/users/update-profile", userData);
export const updatePassword = (passwordData) => API.put("/users/update-password", passwordData);

// Admin API Calls
export const updateAdminProfile = (adminData) => API.put("/admin/updateAdminProfile", adminData);
export const updateAdminPassword = (passwordData) => API.put("/admin/updateAdminPassword", passwordData);

export default API;