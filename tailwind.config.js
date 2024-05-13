/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dimWhite: "rgba(239, 239, 239, 0.75)",
      },
    },
  },
  plugins: [],
}