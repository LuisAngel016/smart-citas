import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.smartcitas.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Si usas autenticación, agrega aquí interceptores:
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
