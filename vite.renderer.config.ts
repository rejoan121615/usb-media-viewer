import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig(async () => {
  const tailwindcss = await import("@tailwindcss/vite");
  
  return {
    plugins: [tailwindcss.default()],
  };
});
