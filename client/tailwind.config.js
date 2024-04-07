/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Roboto Slab', 'serif']
    },
    extend: {
      width: {
        main: '1220px',
      },
      backgroundColor: {
        main: '#eed6d0',
        sub: '#006241',
        primary: {
          1: '#603914',
        }
      },
      textColor: {
        main: '#006241',
        primary: {
          1: '#000000',
        }
      },
      borderColor: {
        main: '#fbc4c4',
        sub: '#006241',
        primary: {
          1: '#603914',
        }
      },
      minWidth: {
        main: '1220px',
      }
    },
    keyframes: {
      'slide-top-small': {
        '0%': {
          '-webkit-transform': 'translateY(8px)',
          transform: 'translateY(8px)'
        },
        '100%': {
          '-webkit-transform': 'translateY(0px)',
          transform: 'translateY(0px)'
        }
      }
    },
    animation: {
      'slide-top': 'slide-top 0.5s cubbic-bezier(0.25,0.46,0.45,0.94) both',
      'slide-top-sm': 'slide-top-sm 0.1s linear both',
    },
    screens: {
      'sm': { 'max': '767px' },
      'md': { 'min': '768px', 'max': '1220px' },
      'lg': { 'min': '1220px', 'max': '1800px' },

    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}