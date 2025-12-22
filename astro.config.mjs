// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import dotenv from 'dotenv';

import tailwindcss from '@tailwindcss/vite';

// Obtener empresa y ambiente
const empresa = process.env.EMPRESA || 'empresa1';
const env = process.env.NODE_ENV || 'development';
const ambiente = env === 'development' ? 'local' : env;

// Cargar archivo .env desde carpeta: env/empresa1/.env.local
const envFile = `env/${empresa}/.env.${ambiente}`;
dotenv.config({ path: envFile });

console.log(`🏢 Empresa: ${empresa}`);
console.log(`🌍 Ambiente: ${ambiente}`);
console.log(`🔧 Archivo .env: ${envFile}`);
console.log(`🔑 STORYBLOK_TOKEN: ${process.env.STORYBLOK_TOKEN ? '✅ Cargado' : '❌ No encontrado'}`);

// Validar que el token exista
if (!process.env.STORYBLOK_TOKEN) {
  throw new Error(`❌ STORYBLOK_TOKEN no encontrado en ${envFile}`);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://localhost:4321',
  integrations: [
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
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