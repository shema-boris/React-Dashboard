/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B5CFA",
        darkBg: "#1E1B2E",
        darkPanel: "#2B2640"
      },
    },
  },
  plugins: [],
};
