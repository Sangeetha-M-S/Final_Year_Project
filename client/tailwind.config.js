/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'jade': '#147196',
        'heading': '#30a6d9',
        'button': '#d0d6d9',
        'hoverButton': '#005d3a',
        'headerHover': '#021c2b',
        'mainbg1' : '#67D68',
        'mainbg2' : '#50D5B7',
      },
    },
  },
  plugins: [],
}

