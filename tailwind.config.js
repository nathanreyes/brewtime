/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.green,
      red: colors.red,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
