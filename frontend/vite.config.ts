import { defineConfig } from "vite";

export default defineConfig({
  build: { outDir: "dist", emptyOutDir: true },
  // `npm run dev` talks to a Python server started with neurolume.show(..., port=8000).
  server: { proxy: { "/api": "http://127.0.0.1:8000" } },
});
