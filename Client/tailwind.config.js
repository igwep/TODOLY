/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customColor: '#FF6767',
        lighterCustomColor: '#FF9494'
      }
    },
  },
  plugins: [],
}

