/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        accent: "A855F7",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at 50% 50%, #6366F1, #A855F7)",
      },
    },
  },
  plugins: [],
}