import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: Number(process.env.PORT) || 8080,
    hmr: {
      overlay: false,
    },
    warmup: {
      clientFiles: [
        "./src/main.tsx",
        "./src/App.tsx",
        "./src/pages/HomePage.tsx",
        "./src/content/siteImageSelections.ts",
        "./src/content/home.ts",
      ],
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the large, stable, eagerly-loaded vendor libraries out of the
        // main app chunk. These load on first paint regardless (React runtime,
        // the router, and the site-wide MotionConfig), but as separate chunks
        // they cache independently — app-code changes no longer force a
        // re-download of the ~270kB React/motion runtime. Lazy route chunks
        // are left to Vite's default per-page splitting.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("react-router") || id.includes("@remix-run/router")) return "react-router";
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          }
        },
      },
    },
  },
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
