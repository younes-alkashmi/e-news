import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getSuggestions = (userId) =>
  API.get(`/user/${userId}/suggestions`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUsers = () => API.get("/user/");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const approveUsers = (users) => API.put("/user/approve", { users });
export const removeUsers = (users) =>
  API.delete("/user/remove", { data: { users } });
export const updateAdmin = (id, data) =>
  API.put(`/user/${id}/updateAdmin`, data);
