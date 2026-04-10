import axios from "axios";

const normalizeBaseUrl = (url) => {
  if (!url) {
    return "";
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const API_ORIGIN = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
const API_BASE = `${API_ORIGIN}/tasks`;

export const getTasks = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data;
};

export const createTask = async (title) => {
  const response = await axios.post(API_BASE, { title });
  return response.data.data;
};

export const updateTaskStatus = async (id, completed) => {
  const response = await axios.patch(`${API_BASE}/${id}`, { completed });
  return response.data.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};
