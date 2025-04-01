/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {},
  },
  future: {
    disableColorOpacityUtilitiesByDefault: true, // Prevents Tailwind from using `oklch`
  },
};
