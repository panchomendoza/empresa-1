// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import dotenv from 'dotenv';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

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

if (!vercelEnv) {
  const envFile = `.env.${company}.${ambiente}`;
  dotenv.config({ path: envFile });
  console.log(`🔧 Archivo .env cargado: ${envFile}`);
}

console.log(`🏢 Empresa: ${company}`);
console.log(`🌍 Ambiente: ${ambiente}`);
console.log(`🔧 VERCEL_ENV: ${vercelEnv || 'No detectado (local)'}`);
console.log(`🔑 STORYBLOK_TOKEN: ${process.env.STORYBLOK_TOKEN ? '✅ Cargado' : '❌ No encontrado'}`);

// DETERMINAR SI ES SSR O SSG
// Queremos SSR en QA (Vercel Preview) y en Local (para desarrollo fluido)
// Queremos SSG solo en Producción final
const isSSR = ambiente === 'qa' || ambiente === 'local';

const site = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:4321'; // Nota: localhost usualmente es http, no https

export default defineConfig({
  site,
  // 1. El adapter debe estar presente para que Astro sepa cómo manejar SSR cuando lo necesite
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  
  // 2. Output dinámico: 'server' para QA/Local, 'static' para Prod
  output: isSSR ? 'server' : 'static',

  integrations: [
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN || '',
      // 3. IMPORTANTE: El bridge solo debe estar activo donde haya SSR/Preview.
      // En producción estática, el bridge debe ser false para evitar el error de headers.
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
    plugins: [tailwindcss()],
    // 4. Optimización para Vite con variables de entorno
    optimizeDeps: {
      exclude: ['@splitbee/web']
    }
  }
});