/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#aaddff',
        accent: '#f4f4ff',
      },
    },
  },
  plugins: [],
}

