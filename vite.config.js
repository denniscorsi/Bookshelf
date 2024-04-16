import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/books": {
        target: "http://localhost:3000"
      },
      "/book": {
        target: "http://localhost:3000"
      },
      "/books/*": {
        target: "http://localhost:3000"
      },
      "/auth": {
        target: "http://localhost:3000"
      },
      "/shelves": {
        target: "http://localhost:3000"
      }
    }
  }
});
