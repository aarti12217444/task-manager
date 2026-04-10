import axios from "axios";

const DEPLOYED_API_FALLBACK = "https://task-manager-backend-7g67.onrender.com";

const normalizeBaseUrl = (url) => {
  if (!url) {
    return "";
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const API_ORIGIN =
  normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL) || DEPLOYED_API_FALLBACK;
const API_BASE = `${API_ORIGIN}/tasks`;

const getDataOrThrow = (response) => {
  const payload = response?.data?.data;
  if (payload === undefined || payload === null) {
    throw new Error("Invalid API response shape.");
  }
  return payload;
};

export const getTasks = async () => {
  const response = await axios.get(API_BASE);
  const tasks = getDataOrThrow(response);
  if (!Array.isArray(tasks)) {
    throw new Error("Tasks response must be an array.");
  }
  return tasks.filter((task) => task && task.id);
};

export const createTask = async (title) => {
  const response = await axios.post(API_BASE, { title });
  return getDataOrThrow(response);
};

export const updateTaskStatus = async (id, completed) => {
  const response = await axios.patch(`${API_BASE}/${id}`, { completed });
  return getDataOrThrow(response);
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};
