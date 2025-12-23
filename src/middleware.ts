import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Crear nueva respuesta con headers modificados
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  
  // Eliminar todos los headers que bloquean iframe
  newResponse.headers.delete('x-frame-options');
  newResponse.headers.delete('X-Frame-Options');
  
  // Solo agregar CSP si no existe
  if (!newResponse.headers.has('Content-Security-Policy')) {
    newResponse.headers.set('Content-Security-Policy', 'frame-ancestors https://app.storyblok.com');
  }
  
  // Agregar headers adicionales para debugging
  newResponse.headers.set('X-Storyblok-Enabled', 'true');
  
  return newResponse;
});
