/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '961px',
        'lg': '1024px',
        'xl': '1300px',
        '2xl': '1441px',
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
};
