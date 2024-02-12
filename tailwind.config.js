/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DF5627',
        secondary: '#2757DF',
        error: 'red',
      },
    },
  },
  plugins: [],
};
