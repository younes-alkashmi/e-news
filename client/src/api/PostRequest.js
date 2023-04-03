import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getTimeLine = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });

export const addComment = (id, commentData) =>
  API.put(`/post/${id}/comment`, { commentData });

export const deleteComment = (id) => API.delete(`/post/${id}/comment`);

export const updatePost = (id, formData) =>
  API.put(`/post/${id}/update`, formData);

export const deletePost = (id, postData) => API.delete(`/post/${id}`, postData);

export const getTrends = (id) => API.get(`/post/${id}/trends`);

export const sharePost = (id, userId) =>
  API.put(`/post/${id}/share`, { _id: userId });
