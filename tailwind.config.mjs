/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Enlazamos Tailwind con tus variables dinámicas de Storyblok
                brand: {
                    primary: 'var(--brand-primary)',
                    secondary: 'var(--brand-secondary)',
                    bg: 'var(--brand-bg)',
                }
            },
            borderRadius: {
                // Esto te permite usar 'rounded-brand' en cualquier componente
                brand: 'var(--brand-radius)',
            }
        },
    },
    plugins: [],
};