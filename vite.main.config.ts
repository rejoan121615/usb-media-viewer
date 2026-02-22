import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      // Only externalize ffmpeg-static because it resolves to a native binary path
      // that must be read from the filesystem (not bundled into the JS output).
      // Pure JS modules like fs-extra and mime-types are bundled normally by Vite.
      external: [
        'ffmpeg-static',
      ],
    },
  },
});
