// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import dotenv from 'dotenv';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

// Obtener empresa y ambiente
const company = process.env.EMPRESA || 'empresa1';

// Detectar ambiente:
// - En Vercel: usar VERCEL_ENV (production, preview, development)
// - Local: usar NODE_ENV
const vercelEnv = process.env.VERCEL_ENV;
let ambiente;

if (vercelEnv === 'production') {
  ambiente = 'production';
} else if (vercelEnv === 'preview') {
  ambiente = 'qa'; // Preview de Vercel = QA
} else {
  // Local development
  const env = process.env.NODE_ENV || 'development';
  ambiente = env === 'development' ? 'local' : env;
}

// Cargar archivo .env desde carpeta: env/empresa1/.env.local
const envFile = `env/${company}/.env.${ambiente}`;
dotenv.config({ path: envFile });

console.log(`🏢 Empresa: ${company}`);
console.log(`🌍 Ambiente: ${ambiente}`);
console.log(`🔧 Archivo .env: ${envFile}`);
console.log(`🔧 VERCEL_ENV: ${vercelEnv || 'No detectado (local)'}`);
console.log(`🔑 STORYBLOK_TOKEN: ${process.env.STORYBLOK_TOKEN ? '✅ Cargado' : '❌ No encontrado'}`);

// Validar que el token exista
if (!process.env.STORYBLOK_TOKEN) {
  throw new Error(`❌ STORYBLOK_TOKEN no encontrado en ${envFile}`);
}

// Configuración dinámica según ambiente
const isQA = ambiente === 'qa';

// Configuración base
const baseConfig = {
  site: 'https://localhost:4321',
  integrations: [
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
      bridge: ambiente !== 'production',
      apiOptions: {
        region: 'eu'
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
};

// https://astro.build/config
export default defineConfig(
  isQA
    ? {
        ...baseConfig,
        output: 'server',
        adapter: vercel({
          webAnalytics: { enabled: true }
        })
      }
    : {
        ...baseConfig,
        output: 'static'
      }
);