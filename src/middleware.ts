import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Crear nueva respuesta con headers modificados
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  
  // Eliminar X-Frame-Options y agregar CSP
  newResponse.headers.delete('x-frame-options');
  newResponse.headers.delete('X-Frame-Options');
  newResponse.headers.set('Content-Security-Policy', 'frame-ancestors https://app.storyblok.com');
  
  return newResponse;
});
