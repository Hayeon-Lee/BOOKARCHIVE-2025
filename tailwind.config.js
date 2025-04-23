/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/antd/dist/antd.min.css', // ✅ 혹은
    './src/styles/**/*.{css,scss}', // ✅ 글로벌 CSS 위치 포함
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"42dot Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
