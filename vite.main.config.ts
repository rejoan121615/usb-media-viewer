import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      // Externalize native/binary modules so Vite doesn't bundle them into main.js.
      // They will be required at runtime from node_modules (or asar.unpacked).
      external: [
        'ffmpeg-static',
        'fs-extra',
        'mime-types',
      ],
    },
  },
});
