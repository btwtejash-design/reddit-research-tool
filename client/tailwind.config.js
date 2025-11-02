/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Covers all src
    "./src/pages/**/*.{jsx,tsx}", // Explicit for pages
    "./src/components/**/*.{jsx,tsx}", // Explicit for components
  ],
  theme: {
    extend: {
      colors: {
        green: { // Match screenshots: #16A34A-ish
          50: '#f0fdf4',
          500: '#22c55e', // Green-500 for CTAs
          600: '#16a34a',
          700: '#15803d',
        },
      },
    },
  },
  plugins: [],
};