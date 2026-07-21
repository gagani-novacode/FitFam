import axios from "axios";

const API_URL = "https://kangaroo-elude-reshape.ngrok-free.dev/api/v1";
const BASE_URL = "https://kangaroo-elude-reshape.ngrok-free.dev";

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
  return url.replace("http://localhost:8080", BASE_URL);
}