import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import circleDependency from "vite-plugin-circular-dependency";

export default defineConfig({
  root: ".",
  plugins: [
    circleDependency({ outputFilePath: "./circleDep" }),
    react({
      include: "**/*.tsx",
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      src: "/src", // Ensure this path is correct
    },
  },
  build: {
    outDir: "./build", // Output directory for production build
  },
  server: {
    port: 3002,
    // host: "0.0.0.0", // Access the server from external networks
    // Uncomment if you want to use HTTPS locally
    // https: true,
    proxy: {
      "/api/v1": {
        target: "http://54.251.8.31", // Your backend IP
        changeOrigin: true,
        rewrite: (path) => {
          console.log("path:::::", path);
          return path.replace(/^\/api\/v1/, "");
        },
      },
    },
  },
});
