/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#b85042',
        cream: '#e7e8d1',
        ink: '#2B2420',
        moss: '#4A5D45',
        ochre: '#C9A24B',
      },
      fontFamily: {
        serif: ['"Source Serif Pro"', 'Cormorant', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
      },
    },
  },
  plugins: [],
}
