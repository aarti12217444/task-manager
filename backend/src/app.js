const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is running." });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.path} not found.` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

module.exports = app;
