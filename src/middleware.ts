import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Eliminar X-Frame-Options y agregar CSP para permitir iframe de Storyblok
  const headers = new Headers(response.headers);
  headers.delete('X-Frame-Options');
  headers.set('Content-Security-Policy', 'frame-ancestors https://app.storyblok.com');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
});
