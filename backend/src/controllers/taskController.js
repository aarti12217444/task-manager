const mongoose = require("mongoose");
const Task = require("../models/Task");

const getTasks = async (_req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({ success: true, data: tasks });
};

const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required.",
    });
  }

  const task = await Task.create({ title: title.trim() });
  return res.status(201).json({ success: true, data: task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid task id." });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Field 'completed' must be a boolean.",
    });
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { completed },
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found." });
  }

  return res.json({ success: true, data: task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid task id." });
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found." });
  }

  return res.json({ success: true, message: "Task deleted successfully." });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
