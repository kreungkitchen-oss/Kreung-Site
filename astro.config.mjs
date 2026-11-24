// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { portionsReady } from './src/data/business.ts';

export default defineConfig({
  site: 'https://www.kreungla.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(styleguide|thanks|rewards-thanks|404)$/.test(page) &&
        // The food calculator stays out of the sitemap until Sam's portion numbers are in.
        (portionsReady || !page.endsWith('/guides/how-much-food-for-50-people')),
    }),
  ],
});
