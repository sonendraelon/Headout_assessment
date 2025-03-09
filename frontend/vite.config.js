import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Define Vite configuration
export default defineConfig({
  plugins: [react()], // Use the React plugin for Vite
});
