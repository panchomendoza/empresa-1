/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'selector', // Cambiado de 'class' a 'selector'
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: 'var(--brand-primary)',
                    secondary: 'var(--brand-secondary)',
                    bg: 'var(--brand-bg)',
                    text: 'var(--brand-text)',
                    'text-secondary': 'var(--brand-text-secondary)',
                }
            },
            borderRadius: {
                brand: 'var(--brand-radius)',
            },
            // Nota: Aquí puedes usar tus variables de Storyblok directamente
            backgroundColor: {
                'primary': 'var(--brand-bg)', 
                'secondary': 'var(--brand-secondary)',
            },
        },
    },
    plugins: [],
};