import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (_ctx, next) => {
  const res = await next();

  // ✅ permitir iframe dentro de app.storyblok.com
  res.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://app.storyblok.com"
  );

  // ✅ importantísimo si aparece en Vercel/framework
  res.headers.delete("X-Frame-Options");
  res.headers.delete("x-frame-options");

  return res;
};
