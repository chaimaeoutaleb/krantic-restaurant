import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the auth token and CSRF token
instance.interceptors.request.use(
  async (config) => {
    // Get CSRF token from cookies
    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
