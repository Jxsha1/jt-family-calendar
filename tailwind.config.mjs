tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        claret: '#7A263A',
        westhamBlue: '#1BB1E7'
      }
    },
  },
  plugins: [],
};