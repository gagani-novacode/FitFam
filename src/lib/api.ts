import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
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

// Rewrites localhost image URLs to ngrok URL so images load correctly
export function fixImageUrl(url: string): string {
  if (!url) return url;
  return url
    .replace("http://localhost:8080", BASE_URL)
    .replace("https://kangaroo-elude-reshape.ngrok-free.dev", BASE_URL);
}