import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  envDir: './', 
  envPrefix: 'VITE_',
})
