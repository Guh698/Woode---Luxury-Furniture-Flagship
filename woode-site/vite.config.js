import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, "product-page.html"),
        category: resolve(__dirname, "products-category.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
});
