import { defineConfig } from "vite";

// `vite build --mode export` makes the build that `neurolume.export_html()` inlines into one
// standalone file: one JS bundle (notes/KaTeX folded in, no lazy chunks) and one CSS file with
// every font inlined as a data URI, so nothing is fetched at runtime.
export default defineConfig(({ mode }) =>
  mode === "export"
    ? {
        base: "./",
        build: {
          outDir: "dist-export",
          emptyOutDir: true,
          assetsInlineLimit: Number.MAX_SAFE_INTEGER,
          cssCodeSplit: false,
          chunkSizeWarningLimit: 4000,
          rollupOptions: { output: { inlineDynamicImports: true, entryFileNames: "viewer.js", assetFileNames: "viewer[extname]" } },
        },
      }
    : {
        build: { outDir: "dist", emptyOutDir: true },
        // `npm run dev` talks to a Python server started with neurolume.show(..., port=8000).
        server: { proxy: { "/api": "http://127.0.0.1:8000", "/ws": { target: "ws://127.0.0.1:8000", ws: true } } },
      },
);
