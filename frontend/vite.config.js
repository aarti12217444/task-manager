import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/tasks": {
        target: "https://task-manager-backend-7g67.onrender.com",
        changeOrigin: true,
      },
      "/health": {
        target: "https://task-manager-backend-7g67.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
