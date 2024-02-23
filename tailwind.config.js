/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      'slow-spin': 'spin 3s linear infinite'
    }
  },
  plugins: []
};

