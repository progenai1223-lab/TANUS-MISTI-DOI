import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';

const here = fileURLToPath(new URL('.', import.meta.url));
const siteAssets = join(here, '..', 'assets');

// Dev only: serve sites/tanus/assets/* at /assets/*, the same URLs the
// prerender step copies them to in dist/. The production build never uses it.
const siteAssetsInDev = (): Plugin => ({
  name: 'tanus-site-assets',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = (req.url || '').split('?')[0];
      if (!url.startsWith('/assets/')) return next();
      const file = join(siteAssets, decodeURIComponent(url.slice('/assets/'.length)));
      if (!file.startsWith(siteAssets) || !existsSync(file)) return next();
      createReadStream(file).pipe(res);
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), siteAssetsInDev()],
  resolve: {
    alias: {
      '@': join(here, 'src'),
      '@content': join(here, '..', 'content'),
    },
  },
  publicDir: false,
  server: { fs: { allow: [join(here, '..')] } },
  build: {
    outDir: '../dist',
    sourcemap: process.env.MAP === '1',
    emptyOutDir: true,
    assetsDir: 'assets/app',
  },
});
