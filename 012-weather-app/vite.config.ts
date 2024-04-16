import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/App/Components"),
      "@utils": path.resolve(__dirname, "src/App/Utilities"),
      "@icons": path.resolve(__dirname, "src/App/Icons"),
    },
  },
});
