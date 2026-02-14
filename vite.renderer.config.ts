import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig(async () => {
  // const tailwindcss = await import("@tailwindcss/vite");
  
  return {
    // plugins: [tailwindcss.default()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
