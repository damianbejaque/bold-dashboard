/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': 'linear-gradient(270deg, #ee424e 13.86%, #121e6c 83.33%)',
        'principal': '#F6F4F9',
      },
      colors: {
        'azul': '#121E6C',
        'rojo': '#EE424E',
        'gris-oscuro': '#606060',
        'gris-claro': '#F3F3F3',
      },
    },
  },
  plugins: [],
}