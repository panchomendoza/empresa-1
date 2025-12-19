// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || 'https://localhost:4321',
  integrations: [
    storyblok({
      accessToken: import.meta.env.STORYBLOK_TOKEN,
      bridge: true, // Enable bridge in development mode
      apiOptions: {
        region: 'us' // Change to 'eu' if your space is in EU region
      },
      components: {
        hero: 'storyblok/Hero',
        page: 'storyblok/Page',
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});