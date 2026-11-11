import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Zwei Pitch-Decks in einem Repo:
//   /                  SEO-Pitch (Soft Relaunch + SEO-Betreuung)
//   /app-dashboard/    App + Dashboard (zweiter Pitch, November 2026)
export default defineConfig({
  base: './',
  server: { host: true, port: Number(process.env.PORT) || 5173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        appDashboard: resolve(__dirname, 'app-dashboard/index.html')
      }
    }
  }
});
