// src/services/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/ip", // backend base
  baseURL: "/api/ip"
  // timeout: 5000,
});

// GET all IPs
export const getIPs = () => API.get("/");

// POST add new IP
export const addIP = (data) => API.post("/", data);

// PUT update IP by id
export const updateIP = (id, data) => API.put(`/${id}`, data);

// DELETE IP by id
export const deleteIP = (id) => API.delete(`/${id}`);
