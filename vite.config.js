import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    reportCompressedSize: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) return 'vendor-firebase';
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('translation-catalog-')) {
            const match = id.match(/translation-catalog-([a-z]{2})\.js/);
            return match ? `i18n-${match[1]}` : 'i18n';
          }
          if (id.includes('lab-chemicals-locale') || id.includes('medipure-catalog')) {
            return 'catalog-data';
          }
        }
      }
    }
  }
});
