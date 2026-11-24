// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.kreungla.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({ filter: (page) => !/\/(styleguide|thanks|rewards-thanks|404)$/.test(page) }),
  ],
});
