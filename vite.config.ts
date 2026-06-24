import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\/assets\/images\//,
        replacement: `${path.resolve(__dirname, "./src/assets/images")}/`,
      },
      {
        find: /^@\/assets\/videos\//,
        replacement: `${path.resolve(__dirname, "./src/assets/videos")}/`,
      },
      {
        find: /^@\/assets\//,
        replacement: `${path.resolve(__dirname, "./src/assets/images")}/`,
      },
      {
        find: /^@\//,
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
}));
