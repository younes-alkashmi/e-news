import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const logIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const adminLog = (formData) => API.post("/auth/adminlog", formData);
export const verifyUser = (confirmationCode) =>
  API.put(`/auth/confirm/${confirmationCode}`);
