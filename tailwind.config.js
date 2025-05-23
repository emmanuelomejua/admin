/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         bgPurple: '#6922D1',
         bgWhite: '#fff',
         bgR: '#fafafa',
         bgBlack: '#000000'
      }
    },
  },
  plugins: [],
}

