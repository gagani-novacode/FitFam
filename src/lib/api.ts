import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = BASE_URL + "/api/v1";

export const api = axios.create({
  baseURL: API_URL, // ✅ uses VITE_BACKEND_URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function fixImageUrl(url: string): string {
  if (!url) return url;
  return url
    .replace("http://localhost:8080", BASE_URL)
    .replace("https://kangaroo-elude-reshape.ngrok-free.dev", BASE_URL);
}