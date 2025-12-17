/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Aquí enlazamos Tailwind con tus variables dinámicas
				brand: {
					primary: 'var(--brand-primary)',
					secondary: 'var(--brand-secondary)',
				}
			},
		},
	},
	plugins: [],
};