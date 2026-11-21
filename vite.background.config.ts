import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/background/index.ts"),
      name: "CosmicLayerBackground",
      formats: ["iife"],
      fileName: () => "background.js"
    }
  }
});
