import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, "src/App"),
    },
  },
  base: "/top-projects/014-battleship/dist/",
});
