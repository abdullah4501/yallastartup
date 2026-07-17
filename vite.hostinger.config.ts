import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "hostinger",
  publicDir: "../public",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../hostinger-dist",
    emptyOutDir: true,
  },
});
