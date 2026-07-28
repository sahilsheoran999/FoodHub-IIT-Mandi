import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true // Always send cookies for cross-origin requests
});

export default axiosInstance;