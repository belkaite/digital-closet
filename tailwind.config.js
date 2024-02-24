/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBlue: 'hsl(217, 28%, 15%)',
        darkBlue1: 'hsl(218, 28%, 13%)',
        darkBlue2: 'hsl(216, 53%, 9%)',
        darkBlue3: 'hsl(219, 30%, 18%)',
        accentCyan: 'hsl(176, 68%, 64%)',
        accentBlue: 'hsl(198, 60%, 50%)',
        lightRed: 'hsl(0, 100%, 63%)'
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif']
      },
      backgroundImage: (theme) => ({
        'logo-dark-mode': "url('./src/assets/images/di-clo-logo-dark-mode.svg')",
        'logo-light-mode': "url('./src/assets/images/di-clo-logo-light-mode.svg')",
        'curve-dark-mode': "url('./src/assets/images/curve-dark-mode.svg')",
        'curve-light-mode': "url('./src/assets/images/curve-light-mode.svg')"
      })
    }
  },
  variants: {
    extend: {
      backgroundImage: ['dark']
    }
  },
  plugins: []
};
