import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://blog.levelup.land',
  output: 'static',
  vite: {
    server: {
      proxy: {
        '/api/shortlink': {
          target: 'https://go.levelup.land',
          changeOrigin: true,
        },
      },
    },
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
