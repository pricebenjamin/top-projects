import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/App/Components"),
      "@icons": path.resolve(__dirname, "src/Icons"),
      "@interfaces": path.resolve(__dirname, "src/App/Interfaces"),
      "@utilities": path.resolve(__dirname, "src/App/Utilities"),
      "@app": path.resolve(__dirname, "src/App"),
    },
  },
  base: "/top-projects/011-todo-list/dist/",
});
