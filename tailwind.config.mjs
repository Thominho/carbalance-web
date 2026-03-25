/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#23272f',
        accent: '#eb5b37',
        'accent-light': '#f07d5e',
        surface: '#E4EEFA',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Lexend', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
