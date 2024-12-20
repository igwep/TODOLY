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
        lighterCustomColor: '#FF9494',
        textColor: '#3ABEFF'
      },
      fontFamily:{
        Mons: 'Montserrat',
        Inter:'Inter'
      },
      boxShadow: {
       'lighter-sm': '0 1px 3px rgba(0, 0, 0, 0.07)', // Lighter shadow than shadow-sm
        'custom-dark': '4px 4px 15px rgba(0, 0, 0, 0.4)',    // Darker shadow
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      width: {
        '402': '402px',
      },
      height: {
        '166': '166px',
        '176': '176px',
        '266': '266px'
      },
      fontSize: {
        'xxs': '0.595rem', // 10px
      },
      screens: {
        mobile: '320px', // Smallest mobile screens
        tablet: '1040px', // Tablets
        laptop: '1024px', // Laptops
        desktop: '1280px', // Desktops
      },

    },
  },
  plugins: [],
}

