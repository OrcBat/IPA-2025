import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const savedToken = localStorage.getItem("authToken");
if (savedToken) {
  api.defaults.headers.common["Authorization"] = `Basic ${savedToken}`;
}

export const setAuthHeader = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  api.defaults.headers.common["Authorization"] = `Basic ${token}`;
  localStorage.setItem("authToken", token);
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("authToken");
};

export default api;
