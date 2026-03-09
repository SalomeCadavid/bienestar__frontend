import axios from "axios";

const api = axios.create({
  baseURL: "https://bienestar-production-782f.up.railway.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;