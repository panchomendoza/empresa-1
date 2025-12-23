import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const res = await next();

  // No modificar headers para bots/crawlers de redes sociales
  const userAgent = ctx.request.headers.get('user-agent') || '';
  const isCrawler = /bot|crawler|spider|facebook|twitter|linkedin|whatsapp/i.test(userAgent);
  
  if (!isCrawler) {
    // ✅ permitir iframe dentro de app.storyblok.com (solo para usuarios normales)
    res.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://app.storyblok.com"
    );

    // ✅ importantísimo si aparece en Vercel/framework
    res.headers.delete("X-Frame-Options");
    res.headers.delete("x-frame-options");
  }

  return res;
};
