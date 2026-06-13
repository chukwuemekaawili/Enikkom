import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
