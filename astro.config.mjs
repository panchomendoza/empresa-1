// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  site: 'https://localhost:4321',
  integrations: [
    storyblok({
      accessToken: 'kl9ONGVmvQy2tbNQU02F6wtt',
      bridge: true, // Enable bridge in development mode
      apiOptions: {
        region: 'eu' // Changed to EU region
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