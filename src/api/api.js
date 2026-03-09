import axios from "axios";

const api = axios.create({
  baseURL: "https://bienestar-production-782f.up.railway.app/api",
  headers: {
    Accept: "application/json",
  },
});

// Token automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Manejo errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;