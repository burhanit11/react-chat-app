import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      // Load variables from .env files
      dotenv: true,
      // Pass in options into dotenv
      // Example: load all `REACT_APP_*` prefixed variables in .env files
      envFilePath: "/.env",
      importPrefix: "import.meta.env.",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
