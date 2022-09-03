import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import progress from "vite-plugin-progress";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), progress(), visualizer()],
  base: "./",
  server: {
    port: 4000,
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       lodash: ["lodash"],
    //       react: ["react"],
    //     },
    //   },
    // },
  },
});
