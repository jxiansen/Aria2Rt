import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";

export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // build: {
  //   rollupOptions: {
  //     external: ["react", "react-dom", "react-dom/client"],
  //   },
  // },
});
