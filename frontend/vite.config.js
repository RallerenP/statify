import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    'jquery': 'gridstack/dist/jq/jquery.js',
    'jquery-ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui': 'gridstack/dist/jq/jquery-ui.js',
    'jquery.ui.touch-punch': 'gridstack/dist/jq/jquery.ui.touch-punch.js',
  },
  plugins: [svelte()],

  server: {
    port: 4200,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/variables.scss";',
      },
    },
  },
});
