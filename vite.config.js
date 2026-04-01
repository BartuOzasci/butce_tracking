import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'img/logo.png', 'img/background.png', 'manifest.json'],
      manifest: false, // Или public/manifest.json kullanılmaya devam edilir.
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,json}'],
        globIgnores: ['**/img/background.png'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/jczrnyvzswxocrsouguz\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: { maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
});
