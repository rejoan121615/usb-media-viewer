import { defineConfig } from "vite";
import path from "path";
import type { RollupLog, LoggingFunction } from "rollup";

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
    build: {
      rollupOptions: {
        onwarn(warning: RollupLog, warn: LoggingFunction) {
          // Ignore "use client" warnings from MUI/React Router
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        },
      },
    },
  };
});
