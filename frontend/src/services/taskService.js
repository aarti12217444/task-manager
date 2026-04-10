import axios from "axios";

const API_BASE = "/tasks";

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
